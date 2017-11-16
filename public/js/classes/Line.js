function Line(parameters) {
    var x1 = 0,
        y1 = 0,
        z1 = 0,
        x2 = 0,
        y2 = 0,
        z2 = 0,
        perspective1 = 1,
        perspective2 = 1,
        alpha = 1,
        color = 'black',
        lineWidth;

    this.set = function (parameters) {
        if (parameters['x1'] !== undefined) {
            x1 = parseFloat(parameters['x1']);
        }
        if (parameters['y1'] !== undefined) {
            y1 = parseFloat(parameters['y1']);
        }
        if (parameters['z1'] !== undefined) {
            z1 = parseFloat(parameters['z1']);
        }
        if (parameters['x2'] !== undefined) {
            x2 = parseFloat(parameters['x2']);
        }
        if (parameters['y2'] !== undefined) {
            y2 = parseFloat(parameters['y2']);
        }
        if (parameters['z2'] !== undefined) {
            z2 = parseFloat(parameters['z2']);
        }
        if (parameters['perspective1'] !== undefined) {
            perspective1 = parseFloat(parameters['perspective1']);
        }
        if (parameters['perspective2'] !== undefined) {
            perspective2 = parseFloat(parameters['perspective2']);
        }
        if (parameters['alpha'] !== undefined) {
            alpha = parseFloat(parameters['alpha']);
        }
        if (parameters['color'] !== undefined) {
            color = parameters['color'];
        }
        if (parameters['lineWidth'] !== undefined) {
            lineWidth = parseFloat(parameters['lineWidth']);
        }
    };

    this.x1 = function () {
        return x1;
    };

    this.y1 = function () {
        return y1;
    };

    this.z1 = function () {
        return z1;
    };

    this.x2 = function () {
        return x2;
    };

    this.y2 = function () {
        return y2;
    };

    this.z2 = function () {
        return z2;
    };

    this.perspective1 = function () {
        return perspective1;
    };

    this.perspective2 = function () {
        return perspective2;
    };

    this.alpha = function () {
        return alpha;
    };

    this.color = function () {
        return color;
    };

    this.lineWidth = function () {
        return lineWidth;
    };

    this.moveX = function (x_diff) {
        x1 = x1 + x_diff;
        x1 = x1 + x_diff;
    };

    this.moveY = function (y_diff) {
        y2 = y2 + y_diff;
        y2 = y2 + y_diff;
    };

    this.moveZ = function (z_diff) {
        z1 = z1 + z_diff;
        z2 = z2 + z_diff;
    };

    this.toArray = function () {
        return [[x1, y1, z1, perspective1], [x2, y2, z2, perspective2]];
    };

    this.set(parameters);
}