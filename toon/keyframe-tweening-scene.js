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
                    frame: 380,
                    tx: 0,
                    ty: 0,
                }
            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 300,
                    ty: 265,
                    sx: 0.3,
                    sy: 0.3,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 300,
                    ty: 265,
                    sx: 0.3,
                    sy: 0.3,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 127,
                    ty: 269,
                    sx: 0.37,
                    sy: 0.37,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 127,
                    ty: 269,
                    sx: 0.37,
                    sy: 0.37,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 182,
                    ty: 281,
                    sx: 0.39,
                    sy: 0.39,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 182,
                    ty: 281,
                    sx: 0.39,
                    sy: 0.39,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 365,
                    ty: 271,
                    sx: 0.33,
                    sy: 0.33,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 365,
                    ty: 271,
                    sx: 0.33,
                    sy: 0.33,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 50,
                    ty: 265,
                    sx: 0.3,
                    sy: 0.3,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 50,
                    ty: 265,
                    sx: 0.3,
                    sy: 0.3,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawTree,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 415,
                    ty: 275,
                    sx: 0.35,
                    sy: 0.35,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 415,
                    ty: 275,
                    sx: 0.35,
                    sy: 0.35,
                    treeCurve: 1
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
                    ty: 290,
                    treeCurve: 1
                },
                {
                    ctx: renderingContext,
                    frame: 195,
                    tx: 400,
                    ty: 290,
                    treeCurve: 1,
                    ease: KeyframeTweener.quadEaseInOut
                },
                {
                    ctx: renderingContext,
                    frame: 220,
                    tx: 400,
                    ty: 290,
                    treeCurve: -30,
                    ease: KeyframeTweener.elastic
                },
                {
                    ctx: renderingContext,
                    frame: 245,
                    tx: 400,
                    ty: 290,
                    treeCurve: 1,
                    ease: KeyframeTweener.linear
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 400,
                    ty: 290,
                    treeCurve: 1
                }

            ]
        },
        {
            draw: SpriteLibrary.drawGiraffe,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 16,
                    tailTilt: 3 * Math.PI / 4,
                },
                {
                    ctx: renderingContext,
                    frame: 168,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 16,
                    tailTilt: 3 * Math.PI / 4,
                    ease: KeyframeTweener.quadEaseInOut
                },
                {
                    ctx: renderingContext,
                    frame: 195,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 4,
                    tailTilt: 3 * Math.PI / 4,
                    ease: KeyframeTweener.quadEaseInOut
                },
                {
                    ctx: renderingContext,
                    frame: 220,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 3 * Math.PI / 4,
                },
                {
                    ctx: renderingContext,
                    frame: 300,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 3 * Math.PI / 4,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 348,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 7 * Math.PI / 8,
                },
                {
                    ctx: renderingContext,
                    frame: 360,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 7 * Math.PI / 8,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 372,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 3 * Math.PI / 4,
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 250,
                    ty: 225,
                    neckTilt: Math.PI / 8,
                    tailTilt: 3 * Math.PI / 4,
                }
            ]
        },
        {
            draw: SpriteLibrary.drawLion,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 0,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 48,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 75,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -2 * Math.PI / 3,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 96,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 125,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -2 * Math.PI / 3,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 144,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 180,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -2 * Math.PI / 3,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 192,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 225,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -2 * Math.PI / 3,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 240,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 248,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6,
                    ease: KeyframeTweener.easeInOutSin
                },
                {
                    ctx: renderingContext,
                    frame: 269,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 10,
                    ease: KeyframeTweener.quadEaseInOut
                },
                {
                    ctx: renderingContext,
                    frame: 317,
                    tx: 100,
                    ty: 250,
                    neckTilt: 0,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 100,
                    ty: 250,
                    tailTilt: -3 * Math.PI / 4,
                    jawLength: 6,
                }
            ]
        },
        {
            draw: SpriteLibrary.drawPoop,
            keyframes: [
                {
                    ctx: renderingContext,
                    frame: 348,
                    tx: 190,
                    ty: 245,
                    ease: KeyframeTweener.quadEaseOut
                },
                {
                    ctx: renderingContext,
                    frame: 358,
                    tx: 190,
                    ty: 275,
                },
                {
                    ctx: renderingContext,
                    frame: 380,
                    tx: 190,
                    ty: 275,
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