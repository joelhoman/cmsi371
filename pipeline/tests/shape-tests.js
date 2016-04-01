QUnit.test( "Default Shape", function() {
  var s = Shape.shape({}); 
  deepEqual(s.children, [], "Child Test");
  deepEqual(s.color, { r: 0, g: 0, b: 0 }, "Color Test");
  deepEqual(s.vertices, { vertices: [], indices: [] }, "Vertex Test");
  equal(s.mode, null, "Mode Test");
  deepEqual(s.axis, { x: 0, y: 1, z: 0 }, "Axis Test");
});