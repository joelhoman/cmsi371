var Shape = function () {

	var shape = function (shapeSpecs) {
		this.position = shapeSpecs.position || [ 0, 0, 0 ];
		this.scale = shapeSpecs.scale || [ 1, 1, 1 ];
		this.rotation = shapeSpecs.rotation || [ 360, 360, 360 ];
		this.children = shapeSpecs.children || [];
		this.color = shapeSpecs.color || { r: 0.0, g: 0.0, b: 0.0 };
		this.vertices = vertices || { vertices: [], indices: [] };
		this.mode = mode || gl.LINES;

	};

	shape.prototype.translate = function (tx, ty,tz) {

	};

	shape.prototype.scale = function (sx, sy, sz) {

	};

	shape.prototype.rotate = function (theta, rx, ry, rz) {

	};

	shape.prototype.addChild = function (child) {
		this.children.push(child);
	};

	shape.prototype.popChild = function () {
		this.children.pop();
	};

	shape.prototype.setColor = function (color) {
		this.color = color;
	};

	shape.prototype.getPolygonMesh = function () {
		return this.polygonMesh;
	}

	shape.prototype.icosahedron = function () {
		var X = 0.525731112119133606;
        var Z = 0.850650808352039932;

        return {
		            vertices: [
		                [ -X, 0.0, Z ],
		                [ X, 0.0, Z ],
		                [ -X, 0.0, -Z ],
		                [ X, 0.0, -Z ],
		                [ 0.0, Z, X ],
		                [ 0.0, Z, -X ],
		                [ 0.0, -Z, X ],
		                [ 0.0, -Z, -X ],
		                [ Z, X, 0.0 ],
		                [ -Z, X, 0.0 ],
		                [ Z, -X, 0.0 ],
		                [ -Z, -X, 0.0 ]
		            ],

		            indices: [
		                [ 1, 4, 0 ],
		                [ 4, 9, 0 ],
		                [ 4, 5, 9 ],
		                [ 8, 5, 4 ],
		                [ 1, 8, 4 ],
		                [ 1, 10, 8 ],
		                [ 10, 3, 8 ],
		                [ 8, 3, 5 ],
		                [ 3, 2, 5 ],
		                [ 3, 7, 2 ],
		                [ 3, 10, 7 ],
		                [ 10, 6, 7 ],
		                [ 6, 11, 7 ],
		                [ 6, 0, 11 ],
		                [ 6, 1, 0 ],
		                [ 10, 1, 6 ],
		                [ 11, 0, 9 ],
		                [ 2, 11, 9 ],
		                [ 5, 2, 9 ],
		                [ 11, 2, 7 ]
		            ]
		        };
	};

	shape.prototype.sphere = function (resolution) {
		var RADIUS = 0.5;

	    var vertices = [];
	    var indices = [];

	    for (var i = 0; i <= resolution; i++) {
	        var theta = i * Math.PI / resolution;
	        var sinTheta = Math.sin(theta);
	        var cosTheta = Math.cos(theta);

	        for (var j = 0; j <= resolution; j++) {
	            var phi = j * 2 * Math.PI / resolution;
	            var sinPhi = Math.sin(phi);
	            var cosPhi = Math.cos(phi);

	            var x = cosPhi * sinTheta;
	            var y = cosTheta;
	            var z = sinPhi * sinTheta;

	            vertices.push([ x * RADIUS, y * RADIUS, z * RADIUS ]);
	        }
	    }
	    for (var v = 0; v < vertices.length - resolution - 2; v++) {
	        indices.push([ v, v + 1, v + resolution + 1 ]);
	        indices.push([ v + 1, resolution + v + 1, resolution + v + 2 ]);
	    }
	    return {
			    	vertices: vertices,
			        indices: indices
			    };
	};

	shape.prototype.cuboid = function (length, height, width) {
		var X = length / 2;
        var Y = height / 2;
        var Z = width / 2;

        var result = {
            vertices: [
            [ X, Y, Z ],
            [ -X, Y, Z ],
            [ X, -Y, Z ],
            [ X, Y, -Z ],
            [ -X, -Y, Z ],
            [ -X, Y, -Z ],
            [ X, -Y, -Z ],
            [-X, -Y, -Z ],
            ],

            indices: [
            [ 0, 3, 6 ],
            [ 0, 2, 6 ],
            [ 1, 5, 7 ],
            [ 1, 4, 7 ],
            [ 0, 3, 5 ],
            [ 0, 1, 5 ],
            [ 2, 6, 7 ],
            [ 2, 4, 7 ],
            [ 3, 6, 7 ],
            [ 3, 5, 7 ],
            [ 0, 2, 4 ],
            [ 0, 1, 4 ],
            ]
        };
        return result;
	};

	shape.prototype.cylinder = function (resolution) {
		var RADIUS = 0.5;

	    var vertices = [];
	    var indices = [];

	    for (var i = 0; i <= resolution; i++) {
	        var theta = i * Math.PI / resolution;
	        var sinTheta = Math.sin(theta);
	        var cosTheta = Math.cos(theta);

	        for (var j = 0; j <= resolution; j++) {
	            var phi = j * 2 * Math.PI / resolution;
	            var sinPhi = Math.sin(phi);
	            var cosPhi = Math.cos(phi);

	            var x = cosPhi * sinTheta;
	            var y = cosTheta;
	            var z = sinPhi * sinTheta;

	            vertices.push([ x * RADIUS, y * RADIUS, z * RADIUS ]);
	        }
	    }
	    for (var v = 0; v < vertices.length - resolution - 2; v++) {
	        indices.push([ v, v + 1, v + resolution + 1 ]);
	        indices.push([ v + 1, resolution + v + 1, resolution + v + 2 ]);
	    }
	    return {
			    	vertices: vertices,
			    	indices: indices
			    };
	};

	shape.prototype.setMode = function (mode) {
		this.mode = mode;
	}

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
    };

    return shape;
};