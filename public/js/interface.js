(function () {
    var dom = new Dom();
    var editor = new Editor(dom.canvas[0]);
    var algorithms = new Algorithms();

    // Переключение секций
    dom.allNavSections.on('click', function () {
        dom.allNavSections.removeClass('active');
        $(this).addClass('active');

        var section = $(this).data()['section'];
        dom.allSections.css('display', 'none');
        dom.defSection(section).css('display', '')
    });

    //Добавление координаты при нажатии мыши
    dom.canvas.on('mousedown', function (event) {
        event.preventDefault();
        var scale = editor.scale();

        var point = new Point({
            x: Math.floor(event.offsetX / scale),
            y: Math.floor(event.offsetY / scale)
        });

        editor.addCoordinate(point);
        editor.draw(point);
    });

    dom.meshOn.on('click', function () {
        editor.mesh(true);
        editor.update();
    });

    dom.meshOff.on('click', function () {
        editor.mesh(false);
        editor.update();
    });

    dom.axisOn.on('click', function () {
        editor.axis(true);
        editor.update();
    });

    dom.axisOff.on('click', function () {
        editor.axis(false);
        editor.update();
    });

    dom.scalePlus.on('click', function () {
        editor.scale(editor.scale() * 2);
        editor.update();
    });

    dom.scaleMinus.on('click', function () {
        editor.scale(editor.scale() / 2);
        editor.update();
    });

    dom.clearCanvas.on('click', function () {
        editor.clearCoordinates();
        editor.update();
    });

    dom.axisX1.on('change', editor.update.bind(editor));
    dom.axisY1.on('change', editor.update.bind(editor));
    dom.axisZ1.on('change', editor.update.bind(editor));
    dom.axisX2.on('change', editor.update.bind(editor));
    dom.axisY2.on('change', editor.update.bind(editor));
    dom.axisZ2.on('change', editor.update.bind(editor));

    dom.cube.on('click', function () {
        cube.forEach(function (coordinate) {
            editor.addCoordinate(new Point({x: coordinate[0], y: coordinate[1], z: coordinate[2]}));
            editor.update();
        })
    });

    dom.document.on('keydown', function (event) {
        switch (event.keyCode) {
            case 65:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveX(-1);
                });
                editor.update();
                break;
            case 68:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveX(+1);
                });
                editor.update();
                break;
            case 87:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveY(-1);
                });
                editor.update();
                break;
            case 88:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveY(+1);
                });
                editor.update();
                break;
            case 69:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveZ(-1);
                });
                editor.update();
                break;
            case 90:
                editor.coordinates().forEach(function (coordinate) {
                    coordinate.moveZ(+1);
                });
                editor.update();
                break;
            case 67:
                editor.clearCoordinates();
                editor.update();
                break;
        }
    });

    dom.canvas.on('wheel', function (event) {
        event.preventDefault();

        if (editor.coordinates().length === 0) {
            alert("Draw something =)");
            return;
        }

        var coordinates = editor.coordinatesArray();
        var axis = [
            [dom.axisX1Value(), dom.axisY1Value(), dom.axisZ1Value()],
            [dom.axisX2Value(), dom.axisY2Value(), dom.axisZ2Value()]
        ];

        editor.clearCoordinates();
        editor.addCoordinates(algorithms.rotate(coordinates, axis, 30));
        editor.update();
    });

    dom.cdaButton.on('click', function () {
        if (editor.coordinates().length !== 2) {
            alert("Нужно ввести 2 координаты !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/cda",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.brezButton.on('click', function () {
        if (editor.coordinates().length !== 2) {
            alert("Нужно ввести 2 координаты !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/brez",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.wooButton.on('click', function () {
        if (editor.coordinates().length !== 2) {
            alert("Нужно ввести 2 координаты !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/woo",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result.map(function (coordinate) {
                    return new Point({x: coordinate[0], y: coordinate[1], alpha: coordinate[2]});
                });

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.circleButton.on('click', function () {
        if (editor.coordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/circle",
            data: {coordinates: editor.coordinatesArray(), radius: dom.circleRadius()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.ellipseButton.on('click', function () {
        if (editor.coordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/ellipse",
            data: {
                coordinates: editor.coordinatesArray(),
                radiusX: dom.ellipseRadiusX(),
                radiusY: dom.ellipseRadiusY()
            },
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.hyperbolaButton.on('click', function () {
        if (editor.coordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/hyperbola",
            data: {
                coordinates: editor.coordinatesArray(),
                radiusX: dom.hyperbolaRadiusX(),
                radiusY: dom.hyperbolaRadiusY()
            },
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.parabolaButton.on('click', function () {
        if (editor.coordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/parabola",
            data: {coordinates: editor.coordinatesArray(), radius: dom.parabolaRadius()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });


    dom.hermitButton.on('click', function () {
        if (editor.coordinates().length !== 4) {
            alert("Нужно ввести 4 координаты !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/hermit",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.bezierButton.on('click', function () {
        if (editor.coordinates().length !== 4) {
            alert("Нужно ввести 4 координаты !!!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/bezier",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.BSplineButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/b_spline",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.perspectiveButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/perspective",
            data: {coordinates: editor.coordinatesArray(), perspective: 10},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;

                editor.clearCoordinates();
                editor.drawArray(coordinates);
            }
        });
    });

    dom.createPoligonButtonExample1.on('click', function () {
        editor.addCoordinate(new Point({x: 24, y: 23}));
        editor.addCoordinate(new Point({x: 21, y: 18}));
        editor.addCoordinate(new Point({x: 11, y: 14}));
        editor.addCoordinate(new Point({x: 11, y: 8}));
        editor.addCoordinate(new Point({x: 15, y: 20}));
        editor.addCoordinate(new Point({x: 21, y: 14}));
        editor.addCoordinate(new Point({x: 8, y: 23}));

        editor.update();
    });

    dom.createPoligonButton.on('click', function () {
        var points_count = dom.poligonPoints();
        var editorHeight = editor.height() / editor.scale();
        var editorWidth = editor.width() / editor.scale();
        var editorDepth = editor.height() / editor.scale();
        var coordinates = [];

        for (var i = 0; i < points_count; i++) {
            coordinates.push([
                Math.random() * editorWidth, Math.random() * editorHeight, Math.random() * editorDepth
            ])
        }

        coordinates.push(coordinates[0]);

        for (var i = 1; i < coordinates.length; i++) {
            editor.addCoordinate(new Line({
                x1: coordinates[i - 1][0],
                y1: coordinates[i - 1][1],
                z1: coordinates[i - 1][2],
                x2: coordinates[i][0],
                y2: coordinates[i][1],
                z2: coordinates[i][2]
            }))
        }
        editor.update();
    });

    dom.bulgeCheckingButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/bulgeChecking",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var normals = JSON.parse(responce).result.normals;
                var bulge = JSON.parse(responce).result.bulge;

                alert("Нормали: " + normals.toString());
                switch (bulge) {
                    case 'cut':
                        alert("Полигон вырождается в отрезок.");
                        break;
                    case 'convex_left':
                        alert("Полигон выпуклый, нормали ориентированы влево от контура.");
                        break;
                    case 'convex_right':
                        alert("Полигон выпуклый, нормали ориентированы вправо от контура.");
                        break;
                    case 'concave':
                        alert("Вогнутый полигон.");
                        break;
                }
            }
        });
    });

    dom.GreckemShellButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/grekhemShell",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                editor.drawArray(JSON.parse(responce).result);
            }
        });
    });

    dom.JarvisShellButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/jarvisShell",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                debugger;
            }
        });
    });

})();