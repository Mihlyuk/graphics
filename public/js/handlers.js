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
            y: Math.floor(event.offsetY / scale),
            color: '#0006DF'
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
        editor.clearFigures();
        editor.update();
    });

    dom.axisX1.on('change', editor.update.bind(editor));
    dom.axisY1.on('change', editor.update.bind(editor));
    dom.axisZ1.on('change', editor.update.bind(editor));
    dom.axisX2.on('change', editor.update.bind(editor));
    dom.axisY2.on('change', editor.update.bind(editor));
    dom.axisZ2.on('change', editor.update.bind(editor));

    dom.cube.on('click', function () {
        cube.forEach(function (coordinates) {
            var figure = editor.toPoints(coordinates);
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            figure = figure.map(function (line) {
                line.color(color);
                return line;
            });

            editor.addFigure(figure);

            editor.update();
        })
    });


    dom.document.on('keydown', function (event) {
        switch (event.keyCode) {
            case 65:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveX(-1);
                    });
                });
                editor.update();
                break;
            case 68:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveX(+1);
                    });
                });
                editor.update();
                break;
            case 87:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveY(-1);
                    });
                });
                editor.update();
                break;
            case 88:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveY(+1);
                    });
                });
                editor.update();
                break;
            case 69:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveZ(-1);
                    });
                });
                editor.update();
                break;
            case 90:
                editor.figures().forEach(function (figure) {
                    figure.forEach(function (line) {
                        line.moveZ(+1);
                    });
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

        if (editor.figures().length === 0) {
            alert("Draw something =)");
            return;
        }


        var figures = editor.figuresArray();
        var coordinates = editor.figuresToCoordinates(figures);

        var axis = [
            [dom.axisX1Value(), dom.axisY1Value(), dom.axisZ1Value()],
            [dom.axisX2Value(), dom.axisY2Value(), dom.axisZ2Value()]
        ];
        debugger;
        var colors = coordinates.map(function (coordinate) {
            return coordinate[4];
        });
        var rotateCoordinates = algorithms.rotate(coordinates, axis, 25);
        colors.forEach(function (color, index) {
            rotateCoordinates[index][4] = color;
        });

        var rotateFigures = editor.coordinatesToFigures(rotateCoordinates);
        var hiddenFigures = algorithms.hidden(rotateFigures);

        editor.clearFigures();
        hiddenFigures['hidden'].forEach(function (tempFigure) {
            var figure = editor.toPoints(tempFigure);
            figure[0].color(figure[0].color());
            editor.addFigure(figure);
        });
        editor.update();

        editor.clearFigures();
        hiddenFigures['all'].forEach(function (figure) {
            editor.addFigure(editor.toPoints(figure));
        });
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

    dom.createPoligonButton.on('click', function () {
        if (editor.coordinates().length === 0) {
            alert("Нужно ввести хотя бы одн укоординату !!!");
            return;
        }

        var figure = [];
        var coordinates = editor.coordinates();
        coordinates.push(editor.coordinates()[0]);

        for (var i = 1; i < coordinates.length; i++) {
            figure.push(new Line({
                x1: coordinates[i - 1].x(),
                y1: coordinates[i - 1].y(),
                x2: coordinates[i].x(),
                y2: coordinates[i].y(),
                lineWidth: 0.3
            }));
        }
        editor.clearCoordinates();
        editor.addFigure(figure);
        editor.update();
    });

    dom.createLineButton.on('click', function () {
        if (editor.coordinates().length !== 2) {
            alert("Нужно ввести две координаты !!!");
            return;
        }
        var coordinates = editor.coordinates();

        editor.addFigure([new Line({
            x1: coordinates[0].x(),
            y1: coordinates[0].y(),
            x2: coordinates[1].x(),
            y2: coordinates[1].y(),
            lineWidth: 0.3
        })]);

        editor.clearCoordinates();
        editor.update();
    });

    dom.bulgeCheckingButton.on('click', function () {
        var figures = editor.figuresArray();

        $.ajax({
            type: "POST",
            url: "/bulgeChecking",
            data: {coordinates: figures[figures.length - 1]},
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
                var figure = JSON.parse(responce).result.map(function (line) {
                    return new Line({
                        x1: line[0][0],
                        y1: line[0][1],
                        x2: line[1][0],
                        y2: line[1][1]
                    });
                });
                editor.addFigure(figure);
                editor.clearCoordinates();
                editor.update();
            }
        });
    });

    dom.JarvisShellButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/jarvisShell",
            data: {coordinates: editor.coordinatesArray()},
            success: function (responce) {
                var figure = JSON.parse(responce).result.map(function (line) {
                    return new Line({
                        x1: line[0][0],
                        y1: line[0][1],
                        x2: line[1][0],
                        y2: line[1][1]
                    });
                });
                editor.addFigure(figure);
                editor.clearCoordinates();
                editor.update();
            }
        });
    });

    dom.pointOfIntersectionButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/point_of_intersection",
            data: {poligon: editor.figuresArray()[0], line: editor.figuresArray()[1]},
            success: function (responce) {
                var coordinates = JSON.parse(responce).result;
                coordinates = coordinates.map(function (coordinate) {
                    return new Point({
                        x: coordinate[0],
                        y: coordinate[1],
                        color: '#FB0003'
                    });
                });

                editor.drawArray(coordinates);
            }
        });
    });

    dom.membershipPointButton.on('click', function () {
        $.ajax({
            type: "POST",
            url: "/membership_point",
            data: {poligon: editor.figuresArray()[0], point: editor.coordinatesArray()[0]},
            success: function (responce) {
                if (JSON.parse(responce).result) {
                    alert('Точка принадлежит плоскости');
                } else {
                    alert('Точка не принадлежит плоскости');
                }
            }
        });
    });

    dom.sketch1Button.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Для начала нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/raster_scan_1",
            data: {poligon: editor.figuresArray()[0]},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (point) {
                    editor.draw(point);
                });
            }
        });
    });

    dom.sketch2Button.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Для начала нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/raster_scan_1",
            data: {poligon: editor.figuresArray()[0]},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (point) {
                    editor.draw(point);
                });
            }
        });
    });

    dom.sketch3Button.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Для начала нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/raster_scan_3",
            data: {poligon: editor.figuresArray()[0], coordinate: editor.coordinatesArray()[0]},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (point) {
                    editor.draw(point);
                });
            }
        });
    });

    dom.sketch4Button.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Для начала нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/raster_scan_4",
            data: {poligon: editor.figuresArray()[0], coordinate: editor.coordinatesArray()[0]},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (point) {
                    editor.draw(point);
                });
            }
        });
    });

    dom.sketch4Button.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/raster_scan_4",
            data: {poligon: editor.figuresArray()[0], coordinate: editor.coordinatesArray()[0]},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (point) {
                    editor.draw(point);
                });
            }
        });
    });

    dom.hideLines1.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/hide_lines_1",
            data: {poligon: editor.figuresArray()[0], lines: editor.figuresArray().slice(1)},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (object) {
                    debugger;
                    var figure = editor.toPoint(object);
                    if (figure instanceof Line) {
                        figure.lineWidth(0.3);
                    }
                    figure.color('green');
                    editor.draw(figure);
                });
            }
        });
    });

    dom.hideLines2.on('click', function () {
        if (editor.figuresArray().length < 1) {
            alert("Нарисуйте полигон =)");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/hide_lines_2",
            data: {poligon: editor.figuresArray()[0], lines: editor.figuresArray().slice(1)},
            success: function (responce) {
                JSON.parse(responce).result.forEach(function (object) {
                    debugger;
                    var figure = editor.toPoint(object);
                    if (figure instanceof Line) {
                        figure.lineWidth(0.3);
                    }
                    figure.color('green');
                    editor.draw(figure);
                });
            }
        });
    });

})();