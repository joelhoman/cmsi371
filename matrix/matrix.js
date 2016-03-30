var Matrix = (function () {
    // Define the constructor.
    var matrix = function (array, height, width) {
        this.height = height || 4;
        this.width = width || 4;
        this.elements = array || [
                                    1, 0, 0, 0,
                                    0, 1, 0, 0,
                                    0, 0, 1, 0,
                                    0, 0, 0, 1
                                ];
    };

    matrix.prototype.height = function () {
        return this.height;
    }

    matrix.prototype.width = function () {
        return this.width;
    }

    matrix.prototype.totalElements = function () {
        return this.width * this.height;
    };

    matrix.prototype.multiply = function (s) {
        var result = [];

        for (var i = 0, iMax = matrix.prototype.totalElements(); i < iMax; i += this.height) {
            var row = [];
            for (var e = i, eMax = e + this.width; e < eMax; e++) {
                row.push(this.elements[ e ]);
            }
            for (var c = 0, cMax = s.width(); c < cMax; c++) {
                var column = [];
                for (var j = c, jMax = s.totalElements(); j < jMax; j += this.width) {
                    column.push(s.elements[ j ]);
                }
                result.push(matrix.prototype.dot(row, column));
            }
        }
        return result;
    };

    matrix.prototype.dot = function (row, column) {
        var result = 0;

        for (var i = 0, max = matrix.prototype.dimensions(); i < max; i++) {
            result += row[i] * column[i];
        }
        return result;
    };

    matrix.prototype.translate = function (tx, ty, tz) {
        var tx = tx || 0;
        var ty = ty || 0;
        var tz = tz || 0;
        var t = new Matrix([ 
                                1, 0, 0, tx,
                                0, 1, 0, ty,
                                0, 0, 1, tz,
                                0, 0, 0, 1
                            ], 4, 4);
        return t;
    };

    matrix.prototype.scale = function (sx, sy, sz) {
        var sx = sx || 1;
        var sy = sy || 1;
        var sz = sz || 1;
        var s = new Matrix([ 
                                sx, 0, 0, 0,
                                0, sy, 0, 0,
                                0, 0, sz, 0,
                                0, 0, 0, 1
                            ], 4, 4);
        return s;
    };

    matrix.prototype.rotate = function (theta, x, y, z) {
        var x = x || 0;
        var y = y || 0;
        var z = z || 0;
        var theta = theta || 0;
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var oneMinusCos = 1 - cos;
        var r = new Matrix([
                                cos + Math.pow(x,2) * oneMinusCos,
                                x * y * oneMinusCos - z * sin,
                                x * z * oneMinusCos + y * sin,
                                0,
                                y * x * oneMinusCos + z * sin,
                                cos + Math.pow(y, 2) * oneMinusCos,
                                y * z * oneMinusCos - x * sin,
                                0, 
                                z * x * oneMinusCos - y * sin,
                                z * y * oneMinusCos + x * sin,
                                cos + Math.pow(z, 2) * oneMinusCos,
                                0,
                                0, 0, 0, 1
                            ], 4, 4);
        return r;
    };

    matrix.prototype.orthographicProjection = function (l, r, b, t, n, f) {
        var width = r - l;
        var height = t - b;
        var depth = f - n;
        var p = [
                    2 / (width), 0, 0, 0 ,
                    0, 2 / (height), 0, 0,
                    0, 0, -2 / depth, 0,
                    -(r + l) / width, -(t + b) / height, -(f + n) / depth, 1
                ];
        return matrix.prototype.multiply(p);
    };

    matrix.prototype.perspectiveProjection = function (l, r, b, t, n, f) {
        var width = r - l;
        var height = t - b;
        var depth = f - n;
        var p = [
                    2 * n / width, 0, 0, 0,
                    0, 2 * n / height, 0, 0,
                    (r + l) / width, (t + b) / height, -(f + n) / depth, -1,
                    0, 0, -2 * n * f / depth, 0,
                ];
        return matrix.prototype.multiply(p);
    };

    matrix.prototype.convert = function () {
        var result = new Float32Array();
        return result;
    };

    return matrix;
})();