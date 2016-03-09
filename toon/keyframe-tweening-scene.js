/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    var canvas = document.getElementById("canvas");
    var renderingContext = canvas.getContext("2d");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.

    /*var sunrise = new Image();
    sunrise.src = 'sunrise.jpg'; 
    renderingContext.save();
    renderingContext.translate(canvas.width,canvas.height);
    sunrise.onload = function(){
        var pattern = renderingContext.createPattern(this, "repeat");
        renderingContext.fillStyle = pattern;
        renderingContext.fill();
    };
    renderingContext.restore();*/

    renderingContext.scale(2,2);
    var sprites = [
        {
            draw: SpriteLibrary.drawSunrise,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 0,
                    ty: 0,
                },

                {
                    ctx: renderingContext,
                    frame: 720,
                    tx: 0,
                    ty: 0,
                }
            ]
        },
        {
            draw: SpriteLibrary.drawPoop,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 0,
                    ty: 0,
                },

                {
                    ctx: renderingContext,
                    frame: 720,
                    tx: 0,
                    ty: 0,
                }
            ]
        },
        {
            draw: SpriteLibrary.drawGiraffe,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    neckTilt: 0,
                    tailTilt: Math.PI / 4,
                },

                {
                    ctx: renderingContext,
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    tailTilt: Math.PI / 2,
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    ctx: renderingContext,
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    tailTilt: Math.PI // Keyframe.rotate uses degrees.
                }
            ]
        },
        {
            draw: SpriteLibrary.drawLion,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    neckTilt: 0,
                    tailTilt: Math.PI / 4,
                },

                {
                    ctx: renderingContext,
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    tailTilt: Math.PI / 2,
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    ctx: renderingContext,
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    tailTilt: Math.PI // Keyframe.rotate uses degrees.
                }
            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 400,
                    ty: 300,
                },

                {
                    ctx: renderingContext,
                    frame: 720,
                    tx: 400,
                    ty: 300,
                }

            ]
        }
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());