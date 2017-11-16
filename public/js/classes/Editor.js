function Editor(canvas_init) {
    var dom = new Dom();
    var canvas = canvas_init;
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var scale = 10;
    var timerId = null;
    var mesh = false;
    var axis = false;

    // the array of points
    var coordinates = [];

    this.coordinates = function () {
        return coordinates;
    };

    this.clearCoordinates = function () {
        coordinates = [];
    };

    /**
     * Добавить координату в общий пулл.
     *
     * @param { Point|Line|number[] } coordinate
     */
    this.addCoordinate = function (coordinate) {
        if (coordinate instanceof Point || coordinate instanceof Line) {
            coordinates.push(coordinate);
        } else if (Array.isArray(coordinate)) {
            coordinates.push(this.toPoint(coordinate));
        } else {
            throw new TypeError("Incorrect type.");
        }
    };

    /**
     * Добавить массив координат в общий пулл.
     *
     * @param { [Point|Line|number[]] } pointsArray
     */
    this.addCoordinates = function (pointsArray) {
        var self = this;

        pointsArray.forEach(function (point) {
            self.addCoordinate(point);
        });
    };

    /**
     * Возвращает координаты в виде массива координат.
     *
     * @return { [<[number[]] | [number[],number[]]>] }
     */
    this.coordinatesArray = function () {
        return this.coordinates().map(function (coordinate) {
            return coordinate.toArray();
        });
    };

    this.clear = function () {
        context.clearRect(0, 0, canvasHeight, canvasWidth);

        this.removeTimer();
    };

    this.height = function () {
        return height;
    };

    this.width = function () {

    };

    this.scale = function (scale_new) {
        if (scale_new !== undefined) {
            scale = scale_new;
        } else {
            return scale;
        }
    };

    this.mesh = function (mesh_new) {
        if (mesh_new !== undefined) {
            mesh = mesh_new;
        } else {
            return mesh;
        }
    };

    this.height = function () {
        return canvasHeight;
    };

    this.width = function () {
        return canvasWidth;
    };

    this.axis = function (axis_new) {
        if (axis_new !== undefined) {
            axis = axis_new;
        } else {
            return axis;
        }
    };

    this.timer = function (timer_new) {
        if (timer_new !== undefined) {
            timerId = timer_new;
        } else {
            return timerId;
        }
    };

    this.removeTimer = function () {
        clearInterval(timerId);
    };

    /**
     * Рисует объует типа Point или Line
     *
     * @param { Point|Line|number[] } coordinate
     */
    this.draw = function (coordinate) {
        if (Array.isArray(coordinate)) {
            coordinate = this.toPoint(coordinate);
        }

        context.globalAlpha = coordinate.alpha();
        context.fillStyle = coordinate.color();
        context.strokeStyle = coordinate.color();

        if (coordinate instanceof Point) {
            var x = (coordinate.x() / coordinate.perspective()) * this.scale();
            var y = (coordinate.y() / coordinate.perspective()) * this.scale();

            context.fillRect(x, y, this.scale(), this.scale());
        } else if (coordinate instanceof Line) {
            context.lineWidth = coordinate.lineWidth() ? coordinate.lineWidth() : this.scale();

            context.beginPath();

            var x1 = (coordinate.x1() / coordinate.perspective1()) * this.scale();
            var y1 = (coordinate.y1() / coordinate.perspective1()) * this.scale();
            var x2 = (coordinate.x2() / coordinate.perspective2()) * this.scale();
            var y2 = (coordinate.y2() / coordinate.perspective2()) * this.scale();

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            context.lineWidth = 1.0;
        } else {
            throw new TypeError("Unsupported coordinate class");
        }

        context.globalAlpha = 1.0;
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
    };

    /**
     * Переводит координату в объект Point или Line.
     *
     * @param { number[] | [number[],number[]] } coordinate
     *
     * @return {Point|Line}
     */
    this.toPoint = function (coordinate) {
        var result = null;

        if (Array.isArray(coordinate[0]) && Array.isArray(coordinate[1])) {
            result = new Line({
                x1: coordinate[0][0], y1: coordinate[0][1], z1: coordinate[0][2], perspective1: coordinate[0][3],
                x2: coordinate[1][0], y2: coordinate[1][1], z2: coordinate[1][2], perspective2: coordinate[1][3]
            })
        } else {
            result = new Point({
                x: coordinate[0], y: coordinate[1], z: coordinate[2], perspective: coordinate[3]
            });
        }

        return result;
    };

    /**
     * Переводит массив координат в массив объектов Point или Line.
     *
     * @param { [number[]] | [[number[],number[]]] } coordinates
     *
     * @return { [Point|Line] }
     */
    this.toPoints = function (coordinates) {
        var self = this;

        return coordinates.map(function (coordinate) {
            return self.toPoint(coordinate);
        });
    };

    /**
     * Рисует массив точек или линий
     *
     * Массив координат, которые необходимо нарисовать.
     * @param { [Point|Line] } coordinates - Массив объектов Point или Line.
     * @param { [number[]] } coordinates - Массив координат точек.
     * @param { [[number[],number[]]] } coordinates - Массив координат линий.
     */
    this.drawArray = function (coordinates) {
        var self = this;

        if (Array.isArray(coordinates[0])) {
            coordinates = this.toPoints(coordinates);
        }

        if (dom.timeoutValue() > 0) {
            var temp_coordinates = jQuery.extend([], coordinates);

            this.timer(setInterval(function () {
                if (temp_coordinates.length === 0) {
                    self.removeTimer();
                } else {
                    self.draw(temp_coordinates.shift());
                }
            }, dom.timeoutValue() * 1000));
        } else {
            coordinates.forEach(function (coordinate) {
                self.draw(coordinate);
            });
        }
    };

    /**
     * Перерисовывает холст.
     */
    this.update = function () {
        this.clear();

        // Drawing mesh
        if (this.mesh()) {
            for (var x = 1; x < this.width() / this.scale(); x++) {
                this.draw(new Line({x1: x, y1: 0, x2: x, y2: this.height() / this.scale(), lineWidth: 0.2}));
            }

            for (var y = 1; y < this.height() / this.scale(); y++) {
                this.draw(new Line({x1: 0, y1: y, x2: this.width() / this.scale(), y2: y, lineWidth: 0.2}));
            }
        }

        // Drawing axis
        if (this.axis()) {
            var axisLine = new Line({
                x1: dom.axisX1Value(),
                y1: dom.axisY1Value(),
                x2: dom.axisX2Value(),
                y2: dom.axisY2Value(),
                color: '#FBBC05'
            });

            this.draw(axisLine);
        }

        this.drawArray(this.coordinates());
    };

}

