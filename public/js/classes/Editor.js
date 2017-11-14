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

    this.addCoordinate = function (point) {
        if (typeof point !== 'Point') {
            throw new TypeError("Class is of type Point.");
        }

        coordinates.push(point);
    };

    this.addCoordinates = function (pointsArray) {
        var self = this;

        pointsArray.forEach(function (point) {
            self.addCoordinate(point);
        });
    };

    this.coordinatesArray = function () {
        return this.coordinates().map(function (coordinate) {
            coordinate.toArray();
        });
    };

    this.addLine = function (line) {
        if (typeof line !== 'Line') {
            throw new TypeError("Class is of type Line.");
        }

        coordinates.push(line);
    };

    this.clear = function () {
        context.clearRect(0, 0, canvasHeight, canvasWidth);

        this.removeTimer();
    };

    this.scale = function (scale_new) {
        if (scale !== undefined) {
            scale = scale_new;
        } else {
            return scale;
        }
    };

    this.mesh = function (mesh_new) {
        if (mesh !== undefined) {
            mesh = mesh_new;
        } else {
            return mesh;
        }
    };

    this.canvasHeight = function () {
        return canvasHeight;
    };

    this.canvasWidth = function () {
        return canvasWidth;
    };

    this.axis = function (axis_new) {
        if (axis !== undefined) {
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

    this.draw = function (coordinate) {
        context.globalAlpha = coordinate.alpha();
        context.fillStyle = coordinate.color();
        context.lineWidth = coordinate.lineWidth();

        if (typeof coordinate === 'Point') {
            var x = (coordinate.x() / coordinate.perspective()) * this.scale();
            var y = (coordinate.y() / coordinate.perspective()) * this.scale();

            context.fillRect(x, y, this.scale(), this.scale());
        } else if (typeof coordinate === 'Line') {
            context.beginPath();
            var x1 = (coordinate.x1() / coordinate.perspective()) * this.scale();
            var y1 = (coordinate.y1() / coordinate.perspective()) * this.scale();
            var x2 = (coordinate.x2() / coordinate.perspective()) * this.scale();
            var y2 = (coordinate.y2() / coordinate.perspective()) * this.scale();

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        } else {
            throw new TypeError("Unsupported coordinate class");
        }

        context.globalAlpha = 1.0;
        context.fillStyle = 'black';
        context.lineWidth = 1.0;
    };

    this.update = function () {
        var self = this;
        this.clear();

        // Drawing mesh
        if (this.mesh()) {
            for (var x = 1; x < this.canvasWidth; x++) {
                if (x % this.scale() === 0) {
                    this.draw(new Line({x1: x, y1: 0, x2: x, y2: this.canvasHeight, lineWidth: 0.1}));
                }
            }

            for (var y = 1; y < this.canvasHeight; y++) {
                if (y % this.scale === 0) {
                    this.draw(new Line({x1: 0, y1: y, x2: this.canvasWidth, y2: y, lineWidth: 0.1}));
                }
            }
        }

        // Drawing axis
        if (this.axis) {
            var axisLine = new Line({
                x1: dom.axisX1Value,
                y1: dom.axisY1Value,
                x2: dom.axisX2Value,
                y2: dom.axisY2Value,
                color: 'red',
                lineWidth: 0.5
            });

            this.draw(axisLine);
        }

        if (this.timer() > 0) {
            var temp_coordinates = this.coordinates();

            this.timer(setInterval(function () {
                self.draw(temp_coordinates.shift());

                if (temp_coordinates.length === 0) {
                    self.removeTimer();
                }
            }), this.timer() * 100);
        } else {
            this.coordinates.forEach(function (coordinate) {
                self.draw(coordinate);
            });
        }
    };

}

