var Shape = function () {

	var shape = function (shapeSpecs) {
		this.position = shapeSpecs.position || [ 0, 0, 0 ];
		this.scale = shapeSpecs.scale || [ 1, 1, 1 ];
		this.rotation = shapeSpecs.rotation || [ 360, 360, 360 ];
		this.children = shapeSpecs.children || {};
		this.color = shapeSpecs.color || { r: 0.0, g: 0.0, b: 0.0 };
		this.vertices = shapeSpecs.vertices || [];
		this.indices = shapeSpecs.indices || [];
		this.mode = mode || gl.LINES;

	};

	shape.prototype.translate = function (tx, ty,tz) {

	};

	shape.prototype.scale = function (sx, sy, sz) {

	};

	shape.prototype.rotate = function (theta, rx, ry, rz) {

	};

	shape.prototype.addChild = function (child) {

	};

	shape.prototype.removeChild = function (child) {

	};

	shape.prototype.setColor = function (color) {

	};

	shape.prototype.icosahedron = function () {

	};

	shape.prototype.sphere = function (resolution) {

	};
	
	shape.prototype.cuboid = function (length, height, width) {

	};

	shape.prototype.cylinder = function (resolution) {

	};

	shape.prototype.toRawTriangleArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    };

    shape.protoype.toRawLineArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

}