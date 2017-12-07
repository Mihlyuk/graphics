function TextObject(parameters) {
    /**
     * Create a Text object.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} z - The z coordinate.
     * @param {number} text - It's just text =).
     * @param {number} font - The font of the text.
     * @param {number} color - The color of the text.
     * @param {number} textAlign - The alignment of the text
     * @param {number} alpha - The transparency of the text.
     */

    var x = 0,
        y = 0,
        z = 0,
        text = '',
        font = '30px Arial',
        color = 'black',
        textAlign = 'center',
        alpha = 1;

    this.init = function (parameters) {
        if (parameters['x'] !== undefined) {
            x = parseFloat(parameters['x']);
        }
        if (parameters['y'] !== undefined) {
            y = parseFloat(parameters['y']);
        }
        if (parameters['z'] !== undefined) {
            z = parseFloat(parameters['z']);
        }
        if (parameters['font'] !== undefined) {
            font = parameters['font'];
        }
        if (parameters['color'] !== undefined) {
            color = parameters['color'];
        }
        if (parameters['textAlign'] !== undefined) {
            textAlign = parameters['textAlign'];
        }
        if (parameters['text'] !== undefined) {
            text = parameters['text'];
        }
        if (parameters['alpha']) {
            alpha = parseFloat(parameters['alpha']);
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

    this.font = function () {
        return font;
    };

    this.color = function () {
        return color;
    };

    this.textAlign = function () {
        return textAlign;
    };

    this.text = function () {
        return text;
    };

    this.alpha = function () {
        return alpha;
    };

    this.init(parameters);
}