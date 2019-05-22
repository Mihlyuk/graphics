function Line(parameters) {
    /**
     * Create a Line object.
     * @param {number} x1 - The x1 coordinate.
     * @param {number} y1 - The y1 coordinate.
     * @param {number} z1 - The z1 coordinate.
     * @param {number} x2 - The x2 coordinate.
     * @param {number} y2 - The y2 coordinate.
     * @param {number} z2 - The z2 coordinate.
     * @param {number} perspective1 - Perspective for first coordinate.
     * @param {number} perspective2 - Perspective for second coordinate.
     * @param {number} alpha - The transparency of the line.
     * @param {number} color - The color of the line.
     * @param {number} lineWidth - The line width of the line.
     */
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
        lineWidth = 1;

    this.init = function (parameters) {
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

    this.alpha = function (new_alpha) {
        if (new_alpha !== undefined) {
            alpha = new_alpha;
        }
        return alpha;
    };

    this.color = function (new_color) {
        if (new_color !== undefined) {
            color = new_color;
        }
        return color;
    };

    this.lineWidth = function (newLineWidth) {
        if (newLineWidth !== undefined) {
            lineWidth = newLineWidth;
        }
        return lineWidth;
    };

    this.moveX = function (x_diff) {
        x1 = x1 + x_diff;
        x2 = x2 + x_diff;
    };

    this.moveY = function (y_diff) {
        y1 = y1 + y_diff;
        y2 = y2 + y_diff;
    };

    this.moveZ = function (z_diff) {
        z1 = z1 + z_diff;
        z2 = z2 + z_diff;
    };

    this.toArray = function () {
        return [[x1, y1, z1, perspective1, color], [x2, y2, z2, perspective2, color]];
    };

    this.init(parameters);
}