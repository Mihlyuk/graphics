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

    this.hidden = function (object) {
        var normals = object.map(function (poligon) {
            var line1 = poligon[0];
            var vector1 = [line1[1][0] - line1[0][0], line1[1][1] - line1[0][1], line1[1][2] - line1[0][2], line1[0][3]];
            var line2 = poligon[1];
            var vector2 = [line2[1][0] - line2[0][0], line2[1][1] - line2[0][1], line2[1][2] - line2[0][2], line2[0][3]];
            var normal = crossProduct(vector1, vector2);
            normal[3] = -matrix.multipleMatrix([line1[0]], matrix.transpose([normal]))[0][0];

            return normal;
        });
        var middle = middlePoint(object);
        var normalsCorrect = matrix.multipleMatrix([middle], matrix.transpose(normals));
        var correctMatrix = normalsCorrect[0].map(function (index) {
            if (index > 0) {
                return -1;
            } else {
                return 1;
            }
        });

        normals = matrix.transpose(normals).map(function (normal) {
            return normal.map(function (coordinate, normalIndex) {
                return coordinate * correctMatrix[normalIndex];
            });
        });

        var resultObjectsMarker = matrix.multipleMatrix([[0, 0, -1, 0]], normals)[0];

        var resultBack = [];
        var resultFront = [];

        resultObjectsMarker.forEach(function (marker, markerIndex) {
            if (marker > 0) {
                resultFront.push(object[markerIndex]);
            } else {
                resultBack.push(object[markerIndex]);
            }
        });

        return {all: object, front: resultFront, back: resultBack};
    };

    function distance(coordinates1, coordinates2) {
        return Math.sqrt(Math.pow(coordinates2[0] - coordinates1[0], 2) + Math.pow(coordinates2[1] - coordinates1[1], 2) + Math.pow(coordinates2[2] - coordinates1[2], 2))
    }

    function min(a, b) {
        return a < b ? a : b;
    }

    function crossProduct(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0], 0];
    }

    function innerProduct(a, b) {
        return [a[0] * b[0] + a[1] * b[1] + a[2] * b[2]];
    }

    function middlePoint(object) {
        var points = [];

        object.forEach(function (poligon) {
            poligon.forEach(function (line) {
                points.push(line[0]);
                points.push(line[1]);
            });
        });

        var minX = _.minBy(points, 0)[0];
        var maxX = _.maxBy(points, 0)[0];
        var minY = _.minBy(points, 1)[1];
        var maxY = _.maxBy(points, 1)[1];
        var minZ = _.minBy(points, 2)[2];
        var maxZ = _.maxBy(points, 2)[2];

        return [
            Math.round(minX + (maxX - minX) / 2),
            Math.round(minY + (maxY - minY) / 2),
            Math.round(minZ + (maxZ - minZ) / 2),
            1
        ]
    }
}