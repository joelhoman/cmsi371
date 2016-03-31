/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m = new Matrix();

        equal(m.height, 4, "Matrix height");
        equal(m.width, 4, "Matrix width");
        equal(m.totalElements(), 16, "Number of elements in matrix");

        var m2 = new Matrix([2, 3, 4, 5], 1, 4);

        equal(m2.height, 1, "Matrix height");
        equal(m2.width, 4, "Matrix width");
        equal(m2.totalElements(), 4, "Number of element in matrix");
    });

    test("Multiplication", function () {
        var m1 = new Matrix([
                                3, 0, 0, 0,
                                0, 3, 0, 0,
                                0, 0, 3, 0,
                                0, 0, 0, 1
                            ], 4, 4);
        var result = [
                        15, 15, 15, 15,
                        15, 15, 15, 15,
                        15, 15, 15, 15,
                        5, 5, 5, 5
                     ];
        var m2 = new Matrix([
                                5, 5, 5, 5,
                                5, 5, 5, 5,
                                5, 5, 5, 5,
                                5, 5, 5, 5
                            ], 4, 4);
        var result1 = m1.multiply(m2);
        deepEqual(result1.elements, result, " Basic Multiplication");

    });

    test("Translate", function () {
        var m1 = new Matrix();
        var result = new Matrix([
                                    1, 0, 0, 2,
                                    0, 1, 0, 2,
                                    0, 0, 1, 2,
                                    0, 0, 0, 1
                                ], 4, 4);
        m1 = m1.translate(2, 2, 2);
        deepEqual(m1.elements, result.elements, "Basic Translation");
    });

    test("Scale", function () {
        var m1 = new Matrix();
        var result = new Matrix([
                                    2, 0, 0, 0,
                                    0, 2, 0, 0,
                                    0, 0, 2, 0,
                                    0, 0, 0, 1
                                ], 4, 4);
        m1 = m1.scale(2, 2, 2);
        deepEqual(m1.elements, result.elements, "Basic Scale");
    });

    test("Rotate", function () {
        var m1 = new Matrix();
        var v = -0.33333333333333315;
        var r1 = 0.666666666666667;
        var r2 = 0.6666666666666667;
        var e = 1;
        var result = new Matrix([
                                    v, r1, r2, 0,
                                    r2, v, r1, 0,
                                    r1, r2, v, 0,
                                    0, 0, 0, 1
                                ], 4, 4);
        deepEqual(result.rotate(180, e, e, e).elements, result.elements, "Basic Rotate");
    });

    test("Orthographic Projection Matrices", function () {
       var m = new Matrix();
       var p = m.orthographicProjection(3, 1, 2, 1, 1, 2);
       var result = [
                         -1.0, 0.0, 0.0, 2.0,
                          0.0, -2.0, 0.0, 3.0,
                          0.0, 0.0, -2.0, -3.0,
                          0.0, 0.0, 0.0, 1.0
                    ];
       deepEqual(p.elements, result, "Orthogonal Projection Matrix");
   });


   test("Perspective Projection Matrices", function () {
       var m = new Matrix();
       var p = m.perspectiveProjection(3, 1, 2, 1, 1, 2);
       var result =  [
                         -1.0, 0.0, -2.0, 0.0,
                          0.0, -2.0, -3.0, 0.0,
                          0.0, 0.0, -3.0, -4.0,
                          0.0, 0.0, -1.0, 0.0
                     ];
       deepEqual(p.elements, result, "Frustum Projection Matrix");
   });
    
    test("Conversion", function () {
        var m1 = new Matrix();
        var m2 = new Matrix();
        var result = new Float32Array(m2.elements);
        deepEqual(m1.convertToWebGL(), result, " Float32Array Conversion for WebGL");

    });

});