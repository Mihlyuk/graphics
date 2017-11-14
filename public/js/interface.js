(function () {
    var dom = new Dom();
    var editor = new Editor(dom.canvas[0]);

    // Переключение секций
    dom.allNavSections.on('click', function () {
        dom.allNavSections.removeClass('active');
        $(this).addClass('active');

        var section = $(this).data()['section'];
        dom.allNavSections.css('display', 'none');
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
        editor.scale(editor.scale * 2);
        editor.update();
    });

    dom.scaleMinus.on('click', function () {
        editor.scale(editor.scale / 2);
        editor.update();
    });

    dom.clearCanvas.on('click', function () {
        editor.clearCoordinates();
        editor.update();
    });

    dom.axisX1.on('change', editor.update);
    dom.axisY1.on('change', editor.update);
    dom.axisZ1.on('change', editor.update);
    dom.axisX2.on('change', editor.update);
    dom.axisY2.on('change', editor.update);
    dom.axisZ2.on('change', editor.update);

    dom.cube.on('click', function () {
        cube.forEach(function (coordinate) {
            editor.addCoordinate({x: coordinate[0], y: coordinate[1], z: coordinate[2]});
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
        }
    });

    dom.canvas.on('wheel', function (event) {
        event.preventDefault();

        if (editor.coordinates().length === 0) {
            alert("Draw something =)");
            return;
        }

        var axis = [
            [dom.axisX1Value, dom.axisY1Value, dom.axisZ1Value],
            [dom.axisX2Value, dom.axisY2Value, dom.axisZ2Value]
        ];

        $.ajax({
            type: "POST",
            url: "/rotate",
            data: {coordinates: editor.coordinatesArray(), angle: 30, axis: axis},
            success: function (responce) {
                editor.clearCoordinates();
                editor.addCoordinates(JSON.parse(responce).result);
                editor.update();
            }
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
                var coordinates = JSON.parse(responce).result.forEach(function(coordinate) {

                });
                editor.clearCoordinates();
                editor.addCoordinates();
                editor.update();
            }
        });
    });

    $('#woo').on('click', function () {
        if (getCoordinates().length !== 2) {
            alert("Нужно ввести 2 координаты !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/woo",
            data: {coordinates: getCoordinates()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#circle').on('click', function () {
        if (getCoordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/circle",
            data: {coordinates: getCoordinates(), radius: getCircleRadius()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#ellipse').on('click', function () {
        if (getCoordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/ellipse",
            data: {coordinates: getCoordinates(), radiusX: getEllipseRadiusX(), radiusY: getEllipseRadiusY()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#hyperbola').on('click', function () {
        if (getCoordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/hyperbola",
            data: {coordinates: getCoordinates(), radiusX: getHyperbolaRadiusX(), radiusY: getHyperbolaRadiusY()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#parabola').on('click', function () {
        if (getCoordinates().length !== 1) {
            alert("Нужно ввести 1 координату !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/parabola",
            data: {coordinates: getCoordinates(), radius: getParabolaRadius()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });



    $('#hermit').on('click', function () {
        if (getCoordinates().length !== 4) {
            alert("Нужно ввести 4 координаты !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/hermit",
            data: {coordinates: getCoordinates()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#bezier').on('click', function () {
        if (getCoordinates().length !== 4) {
            alert("Нужно ввести 4 координаты !!!");
            return;
        }

        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/bezier",
            data: {coordinates: getCoordinates()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#b_spline').on('click', function () {
        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/b_spline",
            data: {coordinates: getCoordinates()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#b_spline').on('click', function () {
        updateCanvas();

        $.ajax({
            type: "POST",
            url: "/b_spline",
            data: {coordinates: getCoordinates()},
            success: function (responce) {
                drawArrayRects(JSON.parse(responce).result);
            }
        });
    });

    $('#perspective').on('click', function () {
        $.ajax({
            type: "POST",
            url: "/perspective",
            data: {coordinates: getCoordinates(), perspective: 10},
            success: function (responce) {
                clearCoordinates();
                addCoordinates(JSON.parse(responce).result);
                updateCanvas();
            }
        });
    });
})();