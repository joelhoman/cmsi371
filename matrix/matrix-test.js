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
        var m1 = new Matrix();
        var result = [ 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5 ];
        var m2 = new Matrix([ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ], 4, 4);
        equal(m2.multiply(m2).elements, result.elements, " Basic Multiplication");

    });

    test("Translate", function () {
        var m1 = new Matrix();
        var result = new Matrix([
                                    1, 0, 0, 2,
                                    0, 1, 0, 2,
                                    0, 0, 1, 2,
                                    0, 0, 0, 1
                                ], 4, 4);
        deepEqual(m1.translate(2, 2, 2).elements, result.elements, "Basic Translation");
    });

    test("Scale", function () {
        var m1 = new Matrix();
        var result = new Matrix([
                                    2, 0, 0, 0,
                                    0, 2, 0, 0,
                                    0, 0, 2, 0,
                                    0, 0, 0, 1
                                ], 4, 4);
        deepEqual(m1.scale(2, 2, 2).elements, result.elements, "Basic Scale");
    });

    /*test("Rotate", function () {
        var m1 = new Matrix();
        var result = new Matrix([
                                    ????
                                    ????
                                    ????
                                    ????
                                ], 4, 4);
        deepEqual(m1.rotate(Math.PI / 2, 5, 5, 5).elements, result.elements, "Basic Rotate");
    });*/

    test("Projection", function () {
        var v = new Vector(3, 3, 0);
        var vresult = v.projection(new Vector(5, 0, 0));

        equal(vresult.magnitude(), 3, "3D vector projection magnitude check");
        equal(vresult.x(), 3, "3D vector projection first element");
        equal(vresult.y(), 0, "3D vector projection second element");
        equal(vresult.z(), 0, "3D vector projection third element");

        // Error check: projection only applies to vectors with the same
        // number of dimensions.
        throws(
            function () {
                (new Vector(5, 2)).projection(new Vector(9, 8, 1));
            },
            "Ensure that projection applies only to vectors with the same number of dimensions"
        );
    });
    
    /*test("Conversion", function () {
        var m = new Matrix();
        equal(m.convert(), [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], " Float32Array Conversion for WebGL");

    });*/

});