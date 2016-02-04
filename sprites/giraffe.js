$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

    SpriteLibrary.drawGiraffe = function(giraffeInst) {

        var ctx = giraffeInst.ctx || document.getElementById("canvas").getContext("2d");
        var neckTilt = giraffeInst.neckTilt || Math.PI;
        var tailTilt = giraffeInst.tailTilt || -Math.PI;
        
        var giraffeBodyLength = 100;
        var giraffeBodyHeight = giraffeBodyLength / 2;

        ctx.save();
        ctx.fillStyle = "rgb(255,221,44)";
        drawGiraffeTail(ctx,giraffeBodyLength,giraffeBodyHeight,tailTilt);
        drawGiraffeNeck(ctx,giraffeBodyLength,giraffeBodyHeight,neckTilt);
        drawGiraffeBody(ctx,giraffeBodyLength,giraffeBodyHeight);
        drawGiraffeLegs(ctx,giraffeBodyLength,giraffeBodyHeight);
        ctx.restore();
    };

    var drawGiraffeBody = function(ctx,bodyLength,bodyHeight) {
 
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0,0,bodyLength/2,bodyHeight/2,0,0,Math.PI * 2,false);
        ctx.fill();
        ctx.restore();
    };

    var drawGiraffeTail = function(ctx,bodyLength,bodyHeight,tailTlit) {
        
        var tailLength = bodyLength / 4;
        var tailWidth = tailLength / 5;
    	
        ctx.save();
        ctx.translate(-4.5 * bodyLength/10,bodyHeight / 8);
    	ctx.rotate(tailTlit);
    	ctx.fillRect(0,0,tailLength,tailWidth);
    	ctx.fillStyle = "rgb(61,53,12)";
    	ctx.translate(tailLength,0);
    	ctx.translate(0,tailWidth / 4);
    	ctx.fillRect(0, 0,tailLength / 3,tailLength / 9);
    	ctx.save();
    	ctx.rotate(-Math.PI / 4);
    	ctx.fillRect(0,0,tailLength / 3,tailLength / 9)
    	ctx.restore();
    	ctx.save();
    	ctx.rotate(Math.PI / 4);
    	ctx.fillRect(0,0,tailLength / 3, tailLength / 9);
    	ctx.restore();
    	ctx.restore();
    };

    var drawGiraffeLeg = function(ctx,bodyLength,bodyHeight) {

        var legLength = bodyLength / 2;
        var legWidth = bodyHeight / 10;

        ctx.save();
        ctx.fillRect(0,0,legWidth,legLength);
        ctx.save();
        ctx.fillStyle = "rgb(61,53,12)";
        ctx.translate(0,legLength);
        ctx.fillRect(0,0,legWidth,legWidth);
        ctx.restore();
        ctx.restore();
    };

    var drawGiraffeLegPair = function(ctx,bodyLength,bodyHeight) {

        ctx.save();
        drawGiraffeLeg(ctx,bodyLength,bodyHeight);
        ctx.translate(bodyLength / 10,0);
        drawGiraffeLeg(ctx,bodyLength,bodyHeight);
        ctx.restore();
    };

    var drawGiraffeLegs = function(ctx,bodyLength,bodyHeight) {

        var legGap = bodyLength / 5;
        var legStart = bodyHeight / 4;

        ctx.save();
        ctx.translate(-2 * legGap,legStart);
        drawGiraffeLegPair(ctx,bodyLength,bodyHeight);
        ctx.restore();
        ctx.save();
        ctx.translate(legGap,legStart);
        drawGiraffeLegPair(ctx,bodyLength,bodyHeight);
        ctx.restore();
    };

    var drawGiraffeNeck = function(ctx,bodyLength,bodyHeight,neckTilt) {

        var neckLength = bodyLength;
        var neckWidth = bodyHeight / 5;

        ctx.save();
        ctx.translate(2 * bodyLength / 5,0);
        ctx.rotate(neckTilt + Math.PI);
        ctx.fillRect(0,0,neckWidth,neckLength);
        drawGiraffeHead(ctx,bodyLength,neckLength,neckWidth);
        ctx.restore();
    };

    var drawGiraffeHead = function(ctx,bodyLength,neckLength,neckWidth) {
        
        var headLength = bodyLength/3;
        var headWidth = headLength/2.5;
        
        ctx.save();
        ctx.translate(0,neckLength);
        drawGiraffeHornPair(ctx,headWidth,neckWidth);
        ctx.translate(-headWidth/2,-headLength/4);
        ctx.rotate(Math.PI/10);
        ctx.beginPath();
        ctx.ellipse(0,0,headLength/2,headWidth/2,0,0,Math.PI * 2,false);
        ctx.fill();
        drawGiraffeEyePair(ctx,headWidth);
        drawGiraffeNose(ctx,headLength,headWidth);
        ctx.restore();
    };

    var drawGiraffeHorn = function(ctx,headWidth,hornLength,hornWidth) {

        ctx.save();
        ctx.fillRect(0,0,hornLength,hornWidth);
        ctx.save();
        drawGiraffeEar(ctx,headWidth);
        ctx.restore();
        var hornRadius = hornWidth / 4;
        ctx.translate(hornWidth / 8,hornWidth + hornRadius);
        ctx.beginPath();
        ctx.fillStyle = "rgb(61,53,12)";
        ctx.ellipse(0,0,hornRadius,hornRadius,0,0,Math.PI * 2,false);
        ctx.fill();
        ctx.restore();
    };

    var drawGiraffeHornPair = function(ctx,headWidth,neckWidth) {

        var hornLength = headWidth / 8;
        var hornWidth = headWidth / 2;

        ctx.save();
        drawGiraffeHorn(ctx,headWidth,hornLength,hornWidth);
        ctx.translate(-neckWidth / 2,-neckWidth / 12);
        drawGiraffeHorn(ctx,headWidth,hornLength,hornWidth);
        ctx.restore();
    };

    var drawGiraffeEar = function(ctx,headWidth) {

        var earLength = headWidth / 4;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,153,255";
        ctx.moveTo(0,0);
        ctx.lineTo(earLength,headWidth / 6);
        ctx.lineTo(earLength,0);
        ctx.fill();
        ctx.strokeStyle = "rgb(255,221,44)";
        ctx.lineWidth = headWidth / 32;
        ctx.stroke();
        ctx.restore();
    };

    var drawGiraffeEye = function(ctx,headWidth) {

        ctx.save();
        ctx.beginPath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.ellipse(0,0,headWidth / 8,headWidth / 4,0,Math.PI * 2,false);
        ctx.fill();
        ctx.restore();
    };

    var drawGiraffeEyePair = function(ctx,headWidth) {

        ctx.save();
        ctx.translate(0,headWidth / 8);
        drawGiraffeEye(ctx,headWidth);
        ctx.translate(headWidth / 3,0);
        drawGiraffeEye(ctx,headWidth);
        ctx.restore();
    };

    var drawGiraffeNose = function(ctx,headLength,headWidth) {

        ctx.save();
        ctx.translate(-headLength / 2,-headWidth / 8);
        ctx.fillStyle = "rgb(61,53,12)";
        ctx.fillRect(0,0,headWidth / 6,headWidth / 6)
        ctx.restore();
    };
}());
