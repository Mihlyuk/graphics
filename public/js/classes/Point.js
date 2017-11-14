function Point(parameters) {
    var x = 0,
        y = 0,
        z = 0,
        perspective = 1,
        alpha = 1,
        color = 'black';

    this.set = function (parameters) {
        if (parameters['x']) {
            x = parseFloat(parameters['x']);
        }

        if (parameters['y']) {
            y = parseFloat(parameters['y']);
        }

        if (parameters['z']) {
            z = parseFloat(parameters['z']);
        }

        if (parameters['perspective']) {
            perspective = parseFloat(parameters['perspective']);
        }

        if (parameters['alpha']) {
            alpha = parseFloat(parameters['alpha']);
        }

        if (parameters['color']) {
            color = parameters['color'];
        }
    };

    this.x = function () {
        return x;
    };

    this.y = function () {
        return y;
    };

    this.z = function () {
        return z;
    };

    this.perspective = function () {
        return perspective;
    };

    this.alpha = function () {
        return alpha;
    };

    this.color = function () {
        return color;
    };

    this.moveX = function (x_diff) {
        x = x + x_diff;
    };

    this.moveY = function (y_diff) {
        y = y + y_diff;
    };

    this.moveZ = function (z_diff) {
        z = z + z_diff;
    };

    this.toArray = function () {
        return [x, y, z, perspective];
    };

    this.set(parameters);
}