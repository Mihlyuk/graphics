function Matrix() {

    this.multipleMatrix = function (matrix1, matrix2) {
        var resultMatrix = [];

        for (var i = 0; i < matrix1.length; i++) {
            resultMatrix[i] = [];

            for (var j = 0; j < matrix2[0].length; j++) {
                resultMatrix[i][j] = 0;

                for (var k = 0; k < matrix2.length; k++) {
                    resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }

        }

        return resultMatrix;
    };

    this.transpose = function(matrix) {
        var transposeMatrix = [];

        for (var i = 0; i < matrix.length; i++) {

            for (var j = 0; j < matrix[i].length; j++) {
                if (!transposeMatrix[j]) {
                    transposeMatrix[j] = [];
                }

                transposeMatrix[j][i] = matrix[i][j];
            }
        }

        return transposeMatrix;
    }
}