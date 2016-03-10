/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

    window.SpriteLibrary = window.SpriteLibrary || {};

    renderingContext.save();
    renderingContext.translate(200,400);
    renderingContext.scale(3.5,3.5);
    SpriteLibrary.drawLion(
    {
        ctx: renderingContext
    });
    renderingContext.translate(100,0);
    SpriteLibrary.drawGiraffe(
    {
        ctx: renderingContext,
        tailTilt: 3 * Math.PI / 4,
        neckTilt: Math.PI / 16
    });
    renderingContext.restore();

    $("#apply-neighborhood-filter-button").click(function () {
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                //NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager
                //NanoshopNeighborhood.distortionBlur
                NanoshopNeighborhood.rain
                //NanoshopNeighborhood.basicEdgeDetector // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
    $("#apply-filter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.randomColorSwapper
            ),
            0, 0
        );
    });
}());