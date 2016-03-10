/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
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

    $("#apply-filter-button").click(function () {
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());