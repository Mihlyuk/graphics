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

    //the array of figures
    var figures = [];


    this.coordinates = function () {
        return coordinates;
    };

    this.figures = function () {
        return figures;
    };

    this.clearCoordinates = function () {
        coordinates = [];
    };

    this.clearFigures = function () {
        figures = [];
    };

    /**
     * Добавить фигуру в общий пулл.
     *
     * @param { Point[]|Line[]|number[] } figure
     */
    this.addFigure = function (figure) {
        var self = this;

        figure = figure.map(function (primitive) {
            if (Array.isArray(primitive)) {
                return coordinates.push(self.toPoint(primitive));
            } else {
                return primitive;
            }
        });

        figures.push(figure);
    };

    /**
     * Возвращает координаты фигур в виде массива координат.
     *
     * @return { [<[number[]] | [number[],number[]]>] }
     */
    this.figuresArray = function () {
        return figures.map(function (figure) {
            return figure.map(function (point) {
                return point.toArray();
            });
        });
    };

    this.figuresToCoordinates = function (figures) {
        var resultCoordinates = [];

        figures.forEach(function (figure) {
            figure.forEach(function (lines) {
                resultCoordinates.push(lines[0]);
                resultCoordinates.push(lines[1]);
            });
        });

        return resultCoordinates;
    };

    this.coordinatesToFigures = function (coordinates) {
        var resultFigures = [];

        for (var i = 0; i < coordinates.length; i += 8) {
            resultFigures.push([
                [coordinates[i], coordinates[i + 1]],
                [coordinates[i + 2], coordinates[i + 3]],
                [coordinates[i + 4], coordinates[i + 5]],
                [coordinates[i + 6], coordinates[i + 7]]
            ]);
        }

        return resultFigures;
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
            context.lineWidth = coordinate.lineWidth() * this.scale();

            context.beginPath();

            var x1 = (coordinate.x1() / coordinate.perspective1()) * this.scale() + this.scale() / 2;
            var y1 = (coordinate.y1() / coordinate.perspective1()) * this.scale() + this.scale() / 2;
            var x2 = (coordinate.x2() / coordinate.perspective2()) * this.scale() + this.scale() / 2;
            var y2 = (coordinate.y2() / coordinate.perspective2()) * this.scale() + this.scale() / 2;

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            context.lineWidth = 1.0;
        } else {
            throw new TypeError("Unsupported coordinate class");
        }

        this.contextReset();
    };

    /**
     * Рисует текст
     *
     * @param {TextObject} textObject
     */
    this.drawText = function (textObject) {
        context.font = textObject.font();
        context.fillStyle = textObject.color();
        context.textAlign = textObject.textAlign();
        context.globalAlpha = textObject.alpha();

        context.fillText(textObject.text(), textObject.x() * this.scale(), textObject.y() * this.scale());

        this.contextReset();
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
                x2: coordinate[1][0], y2: coordinate[1][1], z2: coordinate[1][2], perspective2: coordinate[1][3],
                color: coordinate[0][4]
            })
        } else {
            result = new Point({
                x: coordinate[0], y: coordinate[1], z: coordinate[2], perspective: coordinate[3], color: coordinate[4]
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

    this.drawFigure = function (figure) {
        var self = this;
        if (figure[0].color()) {
            context.fillStyle = figure[0].color();
        }

        context.beginPath();
        context.moveTo(
            figure[0].x1() * this.scale() + this.scale() / 2,
            figure[0].y1() * this.scale() + this.scale() / 2
        );

        figure.forEach(function (line) {
            context.lineTo(
                line.x2() * self.scale() + self.scale() / 2,
                line.y2() * self.scale() + self.scale() / 2
            );
        });
        context.stroke();
        if (figure[0].color() !== 'black') {
            context.fill();
        }

        this.contextReset();
    };

    /**
     * Перерисовывает холст.
     */
    this.update = function () {
        var self = this;
        this.clear();

        // Drawing mesh
        if (this.mesh()) {
            for (var x = 1; x < this.width() / this.scale(); x++) {
                this.draw(new Line({
                    x1: x - 0.5, y1: 0 - 0.5, x2: x - 0.5, y2: this.height() / this.scale() - 0.5,
                    lineWidth: 0.03,
                    alpha: 0.4
                }));

                this.drawText(new TextObject({
                    x: x - 0.5, y: 0.5,
                    text: (x - 1).toString(),
                    font: (this.scale() / 2).toString() + 'px Arial',
                    alpha: 0.4
                }));
            }

            for (var y = 1; y < this.height() / this.scale(); y++) {
                this.draw(new Line({
                    x1: 0 - 0.5, y1: y - 0.5, x2: this.width() / this.scale() - 0.5, y2: y - 0.5,
                    lineWidth: 0.03,
                    alpha: 0.3
                }));
                if (y !== 1) {
                    this.drawText(new TextObject({
                        x: 0.1, y: y - 0.5 + 0.2,
                        text: (y - 1).toString(),
                        font: (this.scale() / 2).toString() + 'px Arial',
                        textAlign: 'left',
                        alpha: 0.3
                    }));
                }
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
        figures.forEach(function (figure) {
            self.drawFigure(figure);
        });
    };

    this.contextReset = function () {
        context.globalAlpha = 1.0;
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        context.font = '10px Arial';
        context.textAlign = 'center';
    }
}

