/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    window.Shape = window.Shape || {};
    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl; // The WebGL context.

    // This variable stores 3D model information.
    var objectsToDraw;

    // The shader program to use.
    var shaderProgram;

    // Utility variable indicating whether some fatal has occurred.
    var abort = false;

    // Important state variables.
    var animationActive = false;
    var rotationAroundX = 0.0;
    var rotationAroundY = 0.0;
    var zCoordinate = 0;
    var currentInterval;
    var modelViewMatrix;
    var projectionMatrix;
    var vertexPosition;
    var vertexColor;

    // An individual "draw object" function.
    var drawObject;

    // The big "draw scene" function.
    var drawScene;

    // State and function for performing animation.
    var previousTimestamp;
    var advanceScene;

    // Reusable loop variables.
    var i;
    var maxi;
    var j;
    var maxj;

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    var cylinderMesh = Shape.cylinder(30);
    var sphereMesh = Shape.sphere(30);
    var groundMesh = Shape.cuboid(1.0, 0.2, 1.0);
    var clockMesh = Shape.cylinder(30);
    var handMesh = Shape.cuboid(0.05, 0.1, 1.0);
    var distanceAway = 10; 

    var ground = Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(groundMesh),
        instanceTransformation: {
            scale: [ 400, 1, 400 ],
            translation: [ 0, 20, 0 ]
        },
        color: { r: .1, g: 1.0, b: 0.0 },
        normals: Shape.toVertexNormalArray(groundMesh)
    });

    var clock1 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(clockMesh),
        instanceTransformation: {
            scale: [ 5, 5, 5 ],
            translation: [ 0, 0, -15 ],
            rotation: [ 90, 1, 0, 0 ]
        },
        color: { r: 1.0, g: 0.65, b: 0.0 },
        normals: Shape.toVertexNormalArray(clockMesh),
        children: [
        Shape.shape({
            mode: gl.TRIANGLES, 
            vertices: Shape.toRawTriangleArray(sphereMesh),
            instanceTransformation: {
                scale: [ 0.2, 0.2, 0.2 ],
                translation: [ 0, -20, 0 ],
            },
            color: { r: 0.1, g: 0.0, b: 0.0 },
            normals: Shape.toVertexNormalArray(sphereMesh)
        }),
        Shape.shape({
            mode: gl.TRIANGLES,
            vertices: Shape.toRawTriangleArray(handMesh),
            instanceTransformation: {
                translation: [ 0, -10, .5 ],
            },
            color: { r: 0.1, g: 0.0, b: 0.0 },
            normals: Shape.toVertexNormalArray(handMesh)
        })
        ]
    });

    var clock2 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(clockMesh),
        instanceTransformation: {
            scale: [ 5, 5, 5 ],
            translation: [ 0, 0, 15 ],
            rotation: [ 90, 1, 0, 0 ]
        },
        color: { r: 1.0, g: 0.65, b: 0.0 },
        normals: Shape.toVertexNormalArray(clockMesh),
        children: [
        Shape.shape({
            mode: gl.TRIANGLES, 
            vertices: Shape.toRawTriangleArray(sphereMesh),
            instanceTransformation: {
                scale: [ 0.2, 0.2, 0.2 ],
                translation: [ 0, 20, 0 ],
            },
            color: { r: 0.1, g: 0.0, b: 0.0 },
            normals: Shape.toVertexNormalArray(sphereMesh)
        }),
        Shape.shape({
            mode: gl.TRIANGLES,
            vertices: Shape.toRawTriangleArray(handMesh),
            instanceTransformation: {
                translation: [ 0, 10, .5 ],
            },
            color: { r: 0.1, g: 0.0, b: 0.0 },
            normals: Shape.toVertexNormalArray(handMesh)
        })
        ]
    });
    
    var pillar1 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ 10, 0, 0 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    var pillar2 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ -10, 0, 0 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    var pillar3 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ 10, 0, 10 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    var pillar4 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ 10, 0, -10 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    var pillar5 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ -10, 0, 10 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    var pillar6 = new Shape.shape({
        mode: gl.TRIANGLES,
        vertices: Shape.toRawTriangleArray(cylinderMesh),
        instanceTransformation: {
            translation: [ -10, 0, -10 ],
            scale: [ 5, 5, 5 ],
        },
        color: { r: 0.75, g: 0.1, b: 1.0 },
        normals: Shape.toVertexNormalArray(cylinderMesh)
    });

    objectsToDraw = [ ground, clock1, clock2, pillar1, pillar2, pillar3, pillar4, pillar5, pillar6 ];

    // Pass the vertices to WebGL.
    var prepDrawObjects = function (objectsToDraw) {
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }

            if (!objectsToDraw[i].specularColors) {
                // Future refactor: helper function to convert a single value or
                // array into an array of copies of itself.
                objectsToDraw[i].specularColors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].specularColors);

            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);
            
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].normals);

            if (objectsToDraw[i].children.length > 0) {
                prepDrawObjects(objectsToDraw[i].children);
            }
        }
    };
    prepDrawObjects(objectsToDraw);

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    var vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    var vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    var vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    var viewportMatrix = gl.getUniformLocation(shaderProgram, "viewportMatrix");
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var xRotationMatrix = gl.getUniformLocation(shaderProgram, "xRotationMatrix");
    var yRotationMatrix = gl.getUniformLocation(shaderProgram, "yRotationMatrix");

    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");
    var lightAmbient = gl.getUniformLocation(shaderProgram, "lightAmbient");
    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object, parentMatrix) {
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);

        var currentMatrix= getFinalMatrix(object);
        if (parentMatrix) {
            currentMatrix = parentMatrix.multiply(currentMatrix);
        }
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, currentMatrix.convertToWebGL());

        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
        if (object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                drawObject(object.children[i], currentMatrix);
            }
        }
    };

    getFinalMatrix = function (object) {
        var tx = object.instanceTransformation.translation[ 0 ];
        var ty = object.instanceTransformation.translation[ 1 ];
        var tz = object.instanceTransformation.translation[ 2 ];
        var tMatrix = new Matrix().translate(tx, ty, tz);

        var sx = object.instanceTransformation.scale[ 0 ];
        var sy = object.instanceTransformation.scale[ 1 ];
        var sz = object.instanceTransformation.scale[ 2 ];
        var sMatrix = new Matrix().scale(sx, sy, sz);

        var theta = object.instanceTransformation.rotation[ 0 ];
        var rx = object.instanceTransformation.rotation[ 1 ];
        var ry = object.instanceTransformation.rotation[ 2 ];
        var rz = object.instanceTransformation.rotation[ 3 ];
        var rMatrix = new Matrix().rotate(theta, rx, ry, rz);
        return new Matrix().multiply(tMatrix).multiply(sMatrix).multiply(rMatrix);
    }
    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var x = new Matrix().rotate(rotationAroundX, 1.0, 0.0, 0.0);
        var y = new Matrix().rotate(rotationAroundY, 0.0, 1.0, 0.0);
        gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, x.convertToWebGL());
        gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, y.convertToWebGL());

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        gl.uniform4fv(lightPosition, [ 5.0, 20.0, zCoordinate, 1.0 ]);
        gl.uniformMatrix4fv(viewportMatrix, gl.FALSE, new Matrix().lookAt(
            0, 0, zCoordinate, 0, 0, zCoordinate - 1, 0, 1, 0).convertToWebGL());

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(viewportMatrix, gl.FALSE, new Matrix().lookAt(
        0, 0, zCoordinate, 0, 0, 1, 0, 1, 0).convertToWebGL());

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Matrix().perspectiveProjection(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10).convertToWebGL()
    );

    var rotateScene = function (event) {
        rotationAroundX = xRotationStart - yDragStart + event.clientY;
        rotationAroundY = yRotationStart - xDragStart + event.clientX;
        drawScene();
    };

    gl.uniform4fv(lightPosition, [ 5.0, 20.0, zCoordinate, 1.0 ]);
    gl.uniform3fv(lightDiffuse, [ 1.0, 1.0, 1.0 ]);
    gl.uniform3fv(lightSpecular, [ 1.0, 1.0, 1.0 ]);
    gl.uniform3fv(lightAmbient, [ 0.1, 0.1, 0.1 ]);

    var xDragStart;
    var yDragStart;
    var xRotationStart;
    var yRotationStart;
    $(canvas).mousedown(function (event) {
        xDragStart = event.clientX;
        yDragStart = event.clientY;
        xRotationStart = rotationAroundX;
        yRotationStart = rotationAroundY;
        $(canvas).mousemove(rotateScene);
    }).mouseup(function (event) {
        $(canvas).unbind("mousemove");
    });

    var movementSpeed = .1;
    var walkLimit = 150
    window.addEventListener("keypress", keyDown, false);
    function keyDown (e) {
        if (e.keyCode == 119 && zCoordinate >= -walkLimit) {
            zCoordinate -= movementSpeed;
        } else if(e.keyCode == 115 && zCoordinate <= walkLimit) {
            zCoordinate += movementSpeed;
        }
        drawScene();
    }

    // Draw the initial scene.
    drawScene();

}(document.getElementById("3d-scene-webgl")));