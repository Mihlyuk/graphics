function Algorithms() {
    var matrix = new Matrix();

    this.rotate = function (coordinates, axis, angle) {
        var d1 = distance(axis[0], [0, 0, 0]);
        var d2 = distance(axis[1], [0, 0, 0]);
        var nearest_point = min(d1, d2) === d1 ? axis[0] : axis[1];

        var direction_vector = distance(axis[1], axis[0]);
        var a = (axis[1][0] - axis[0][0]) / direction_vector;
        var b = (axis[1][1] - axis[0][1]) / direction_vector;
        var c = (axis[1][2] - axis[0][2]) / direction_vector;
        var d = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));

        var t_matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [-nearest_point[0], -nearest_point[1], -nearest_point[2], 1]
        ];
        var x_rotate_matrix = [
            [1, 0, 0, 0],
            [0, c / d, -b / d, 0],
            [0, b / d, c / d, 0],
            [0, 0, 0, 1]
        ];

        var y_rotate_matrix = [
            [d, 0.0, -a, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [a, 0.0, d, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];

        var z_rotate_matrix = [
            [Math.cos(angle), Math.sin(angle), 0, 0],
            [-Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        var y_rotate_matrix_back = [
            [d, 0.0, a, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [-a, 0.0, d, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];

        var x_rotate_matrix_back = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, c / d, b / d, 0.0],
            [0.0, -b / d, c / d, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];

        var t_matrix_back = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [nearest_point[0], nearest_point[1], nearest_point[2], 1]
        ];

        coordinates = matrix.multipleMatrix(coordinates, t_matrix);
        coordinates = matrix.multipleMatrix(coordinates, x_rotate_matrix);
        coordinates = matrix.multipleMatrix(coordinates, y_rotate_matrix);
        coordinates = matrix.multipleMatrix(coordinates, z_rotate_matrix);
        coordinates = matrix.multipleMatrix(coordinates, y_rotate_matrix_back);
        coordinates = matrix.multipleMatrix(coordinates, x_rotate_matrix_back);
        coordinates = matrix.multipleMatrix(coordinates, t_matrix_back);

        return coordinates;
    };

    function distance(coordinates1, coordinates2) {
        return Math.sqrt(Math.pow(coordinates2[0] - coordinates1[0], 2) + Math.pow(coordinates2[1] - coordinates1[1], 2) + Math.pow(coordinates2[2] - coordinates1[2], 2))
    }

    function min(a, b) {
        return a < b ? a : b;
    }
}