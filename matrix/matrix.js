var Matrix = (function () {
    // Define the constructor.
    var matrix = function (x, y, z) {
        return [ [ x, 0, 0, 0 ], [ 0, y, 0, 0 ], [ 0, 0, z, 0], [ 0, 0, 0, 1 ] ]? [ [ 1, 0, 0, 0], [ 0, 1, 0, 0], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1] ];
    };

    matrix.prototype.dimensions = function () {
        return 4;
    }

    matrix.prototype.x = function () {
        return this.elements[0][0];
    }

    matrix.prototype.y = function () {
        return this.elements[1][1];
    }
    matrix.prototype.z = function () {
        return this.elements[2][2];
    }
    
    matrix.prototype.multiply = function (s) {
        var result = new matrix();

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] * s;
        }

        return result;
    };

    vector.prototype.dot = function (m) {
        var result = 0;

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result += this.elements[i] * v.elements[i];
        }

        return result;
    };

    vector.prototype.cross = function (v) {
        if (this.dimensions() !== 3 || v.dimensions() !== 3) {
            throw "Cross product is for 3D vectors only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Vector(
            (this.y() * v.z()) - (this.z() * v.y()),
            (this.z() * v.x()) - (this.x() * v.z()),
            (this.x() * v.y()) - (this.y() * v.x())
        );
    };

    matrix.prototype.translation = function (tx, ty, tz) {
        var result = [];
        var t = [ [ 1, 0, 0, tx ], [ 0, 1, 0, ty ], [ 0, 0, 0, tz ], [ 0, 0, 0, 1 ] ] ? [ [ 1, 0, 0, 1 ], [ 0, 1, 0, 1 ], [ 0, 0, 0, 1 ], [ 0, 0, 0, 1 ] ];
        for (var i = 0; max = this.dimensions; i < max; i++) {
            result.push(this.elements[i].multiply(t));
        }
        return result;
    }

    matrix.prototype.scale = function (sx, sy, sz) {
        var result = [];
        var s = [ [ sx, 0, 0, 0 ], [ 0, sy, 0, 0 ], [ 0, 0, sz, 0 ], [ 0, 0, 0, 1 ] ] ? [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ];
        for (var i = 0; max = this.dimensions; i < max; i++) {
            result.push(this.elements[i].multiply(s));
        }
        return result;
    }

    matrix.prototype.rotation = function (theta) {
        var result = [];
        var r = [ [ ]]
    }

    vector.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

    vector.prototype.projection = function (v) {
        checkDimensions(this, v);

        // Plug and chug :)
        // The projection of u onto v is u dot the unit vector of v
        // times the unit vector of v.
        var unitv = v.unit();
        return unitv.multiply(this.dot(unitv));
    };

    return vector;
})();