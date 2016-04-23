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
    var currentRotation = 0.0;
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
    var cuboid = Shape.shape({
        mode: gl.LINES,
            vertices: (Shape.toRawLineArray(Shape.cuboid(.75, .75, .75))),
            instanceTransformation: {
                translation: [ -2, 0, 0 ],
                scale: [ 1, 1, 1 ],
                rotation: [ 0, 0, 0, 0 ]
            },
        });
    objectsToDraw = [
        Shape.shape({
            mode: gl.LINES,
            vertices: (Shape.toRawLineArray(Shape.cylinder(20))),
            instanceTransformation: {
                translation: [ 0, 0, 0 ],
                scale: [ 1, 1, 1 ],
                rotation: [ 0, 0, 1, 1 ],
                scale: [ 1, 1, 1 ], 
            },
            children: [
            Shape.shape({
                mode: gl.LINES,
                vertices: (Shape.toRawLineArray(Shape.sphere(20))),
                instanceTransformation: {
                translation: [ 1, 1, 0 ],
                scale: [ 1, 1, 1 ],
            },
            }),
            Shape.shape({
                mode: gl.LINES,
                vertices: (Shape.toRawLineArray(Shape.cuboid(.5, .5, .5))),
                instanceTransformation: { 
                    translation: [ 3, -1, 0 ],
                },
            })
            ]
        }),
        cuboid
    ];

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

            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);
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
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object, parentMatrix) {
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        if (parentMatrix) {
            var currentMatrix = getFinalMatrix(object, true);
            currentMatrix = parentMatrix.multiply(currentMatrix);
        }
        else {
            var currentMatrix = getFinalMatrix(object, false);
        }
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, currentMatrix.convertToWebGL());

        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
        if (object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                drawObject(object.children[i], currentMatrix);
            }
        }
    };

    getFinalMatrix = function (object, isChild) {
        var tx = object.instanceTransformation.translation[ 0 ];
        var ty = object.instanceTransformation.translation[ 1 ];
        var tz = object.instanceTransformation.translation[ 2 ];
        var tMatrix = new Matrix().translate(tx, ty, tz);

        var sx = object.instanceTransformation.scale[ 0 ];
        var sy = object.instanceTransformation.scale[ 1 ];
        var sz = object.instanceTransformation.scale[ 2 ];
        var sMatrix = new Matrix().scale(sx, sy, sz);

        var theta = isChild ? object.instanceTransformation.rotation[ 0 ]:
            object.instanceTransformation.rotation[ 0 ] + currentRotation;
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

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Matrix().orthographicProjection(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10).convertToWebGL()
    );

    // Animation initialization/support.
    previousTimestamp = null;
    advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }
        drawScene();

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("3d-scene-webgl")));