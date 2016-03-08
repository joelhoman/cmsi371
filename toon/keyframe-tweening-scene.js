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
    var sprites = [
        {
            draw: window.SpriteLibrary.drawGiraffe,
            keyframes: [
                {
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    neckTilt: 0,
                    tailTilt: Math.PI / 4,
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    tailTilt: Math.PI / 2,
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    tailTilt: Math.PI // Keyframe.rotate uses degrees.
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