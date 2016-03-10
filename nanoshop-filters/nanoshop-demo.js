/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

   window.SpriteLibrary = window.SpriteLibrary || {};

    renderingContext.save();
    renderingContext.translate(300,300);
    renderingContext.scale(6,6);
    SpriteLibrary.drawLion({"ctx": renderingContext});
    renderingContext.restore();

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darkener
            ),
            0, 0
        );
    });
}());