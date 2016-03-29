var Matrix = (function () {
    // Define the constructor.
    var matrix = function () {
        return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
    };

    matrix.prototype.dimensions = function () {
        return 4;
    }

    matrix.prototype.x = function () {
        return this.elements[0];
    }

    matrix.prototype.y = function () {
        return this.elements[5];
    }

    matrix.prototype.z = function () {
        return this.elements[10];
    }

    matrix.prototype.multiply = function (s) {
        var result = new matrix();

        for (var i = 0, max = this.dimensions(); i < max; i++) {
            for (var j = 0; max = this.dimensions(); j < max; j++) {
                var multiplier = [];
                for (var k = 0; k < s.length; k++) {
                    multiplier.push(multiplier[k][i]);
                }
                result.elements[i][j] = this.dot(multiplier, i);
            }
        }

        return result;
    };

    matrix.prototype.dot = function (m, c) {
        var result = 0;

        for (var i = 0, max = this.dimensions(); i < max; i++) {
            result += this.elements[c][i] * m.elements[i];
        }

        return result;
    };

    matrix.prototype.translation = function (tx, ty, tz) {
        var tx = tx || 0;
        var ty = ty || 0;
        var tz = tz || 0;
        var t = [ 
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    tx, ty, tz, 1
                 ];
       return t;
    }

    matrix.prototype.scale = function (sx, sy, sz) {
        var sx = sx || 1;
        var sy = sy || 1;
        var sz = sz || 1;
        var s = [ 
                    sx, 0, 0, 0,
                    0, sy, 0, 0,
                    0, 0, sz, 0,
                    0, 0, 0, 1
                ];
        return s;
    }

    matrix.prototype.rotation = function (theta, x, y, z) {
        var x = x || 0;
        var y = y || 0;
        var z = z || 0;
        var theta = theta || 0;
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var cosMinus = 1 - cos;
        var r = [
                    cos + Math.pow(x,2) * cosMinus,
                    y * x * cosMinus + z * sin,
                    z * x * cosMinus - y * sin,
                    0,
                    x * y * cosMinus - z * sin,
                    cos + Math.pow(y, 2) * cosMinus,
                    z * y * cosMinus + x * sin,
                    0,
                    x * z * cosMinus + y * sin,
                    y * z * cosMinus - x * sin,
                    cos + Math.pow(z, 2) * cosMinus,
                    0,
                    0, 0, 0, 1
                ];
        return r;
    }

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
        return p;
    }

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
        return p;
    }

    return matrix;
})();