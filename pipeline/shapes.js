/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
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
    },

    sphere: function (resolution) {
        return {
            vertices: [
            ],

            indices: [
            ],
        };
    },

    cuboid: function (length, width, height) {
        var X = length / 2;
        var Y = height / 2;
        var Z = width / 2;

        return {
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
            ],
        };
    },

    cylinder: function (resolution) {
        var RADIUS = 0.25;
        var HEIGHT = 0.5;

        var vertices = [];
        var indices = [];
        var thetaDelta = 2 * Math.PI / resolution;
        var currentTheta = 0.0;
        for (var i = 0; i < resolution; i++) {
            vertices.push([
                RADIUS * Math.cos(currentTheta),
                HEIGHT,
                RADIUS * Math.sin(currentTheta)
                ])
            currentTheta += thetaDelta;
        }
        thetaDelta = 2 * Math.PI / resolution;
        for (var i = 0; i < resolution; i++) {
            vertices.push([
                RADIUS * Math.cos(currentTheta),
                -HEIGHT,
                RADIUS * Math.sin(currentTheta)
                ])
            currentTheta += thetaDelta;
        }
        for (var i = 0; i < resolution; i++) {
            if (i + 1 < resolution) {
                var next = i + 1;
            } else {
                var next = 0;
            }
            if ( i == 0) {
                var other = resolution - 1;
            } else {
                var other = resolution - i;
            }
            var last = 2 * resolution;
            indices.push([ i, next, (i + resolution) % last ]);
            indices.push([ (i + resolution), (next + resolution) % last, next ]);
            indices.push([ i, next, other ]);
            indices.push([ i + resolution, (next + resolution) % last, (other + resolution) % last]);
        }
        return {
            vertices: vertices,
            indices: indices
        };
    },


    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
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
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
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

};