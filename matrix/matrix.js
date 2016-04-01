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
        for (var i = 0, iMax = this.totalElements(); i < iMax; i += this.height) {
            var row = [];
            for (var e = i, eMax = e + this.width; e < eMax; e++) {
                row.push(this.elements[ e ]);
            }
            for (var c = 0, cMax = s.width; c < cMax; c++) {
                var column = [];
                for (var j = c, jMax = s.totalElements(); j < jMax; j += this.width) {
                    column.push(s.elements[ j ]);
                }
                result.push(matrix.prototype.dot(row, column));
            }
        }
        var m = new Matrix(result, this.height, s.width);
        return m;
        
    };

    matrix.prototype.dot = function (row, column) {
        var result = 0;

        for (var i = 0, max = row.length; i < max; i++) {
            result += (row[i] * column[i]);
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

    //taken from the bazaar
    matrix.prototype.rotate = function (angle, x, y, z) {
        var angle = angle || 360;
        var x = x || 1;
        var y = y || 1;
        var z = z || 1;
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        var x2;
        var y2;
        var z2;
        var xy;
        var yz;
        var xz;
        var xs;
        var ys;
        var zs;

        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        var r = new Matrix([
                                (x2 * oneMinusC) + c,
                                (xy * oneMinusC) + zs,
                                (xz * oneMinusC) - ys,
                                0.0,

                                (xy * oneMinusC) - zs,
                                (y2 * oneMinusC) + c,
                                (yz * oneMinusC) + xs,
                                0.0,

                                (xz * oneMinusC) + ys,
                                (yz * oneMinusC) - xs,
                                (z2 * oneMinusC) + c,
                                0.0,

                                0.0,
                                0.0,
                                0.0,
                                1.0
                            ], 4, 4);
        return r;
    };

    matrix.prototype.orthographicProjection = function (l, r, b, t, n, f) {
        var width = r - l;
        var height = t - b;
        var depth = f - n;
        var p = new Matrix([
                                2 / (width), 0, 0, -(r + l) / width,
                                0, 2 / (height), 0, -(t + b) / height,
                                0, 0, -2 / depth, -(f + n) / depth,
                                0, 0, 0, 1
                            ], 4, 4);
        return p;
    };

    matrix.prototype.perspectiveProjection = function (l, r, b, t, n, f) {
        var width = r - l;
        var height = t - b;
        var depth = f - n;
        var p = new Matrix([
                                2 * n / width, 0, (r + l) / width, 0,
                                0, 2 * n / height, (t + b) / height, 0,
                                0, 0, -(f + n) / depth, -2 * n * f / depth,
                                0, 0, -1, 0,
                            ], 4, 4);
        return p;
    };

    matrix.prototype.convertToWebGL = function () {
        this.elements = [
                            this.elements[0],
                            this.elements[4],
                            this.elements[8],
                            this.elements[12],

                            this.elements[1],
                            this.elements[5],
                            this.elements[9],
                            this.elements[13],

                            this.elements[2],
                            this.elements[6],
                            this.elements[10],
                            this.elements[14],

                            this.elements[3],
                            this.elements[7],
                            this.elements[11],
                            this.elements[15] 
                        ]
        var result = new Float32Array(this.elements);
        return result;
    };

    return matrix;
})();