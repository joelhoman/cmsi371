$(function(){

	window.SpriteLibrary = window.SpriteLibrary || {};

	SpriteLibrary.drawLion = function(lionInst) {

		var ctx = lionInst.ctx || document.getElementById("canvas").getContext("2d");
		var jawLength = lionInst.jawLength || 5;
		var tailTilt = lionInst.tailTilt || (-5.5 * Math.PI / 8)

		var maneRadius = 25;
		var headLength = 3 * maneRadius / 5;

		ctx.save();
		ctx.fillStyle = "rgb(255,178,102)";
		drawLionTail(ctx,maneRadius,tailTilt);
		drawLionBody(ctx,maneRadius);
		drawLionMane(ctx,maneRadius);
		drawLionHead(ctx,headLength,jawLength);
		ctx.restore();
	};

	var drawLionTail = function(ctx,maneRadius,tailTilt) {

		var tailTipLength = maneRadius / 16;
		var tailTipWidth = maneRadius / 4;

		ctx.save();
		ctx.translate(0,1.25 * maneRadius);
		ctx.rotate(tailTilt);
		ctx.fillRect(0,0,tailTipLength,2 * maneRadius);
		ctx.save();
		ctx.translate(tailTipLength / 2,2 * maneRadius);
		ctx.fillStyle = "rgb(51,25,0)";
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.bezierCurveTo(0,0,-tailTipWidth / 2,tailTipLength,0,tailTipWidth);
		ctx.bezierCurveTo(0,tailTipWidth,tailTipWidth / 2,tailTipLength,0,0);
		ctx.fill();
		ctx.restore();
		ctx.restore();
	};

	var drawLionBody = function(ctx,maneRadius) {

		ctx.save();
		ctx.translate(0,1.5 * maneRadius);
		ctx.save();
		ctx.beginPath();
		ctx.ellipse(0,0,maneRadius,maneRadius,0,Math.PI,false);
		ctx.fill();
		ctx.restore();
		ctx.save();
		ctx.translate(0,-maneRadius / 6);
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,204,153)";
		ctx.ellipse(0,0,3 * maneRadius / 4,5 * maneRadius / 6,0,Math.PI,false);
		ctx.fill();
		ctx.restore();
		drawLionLegs(ctx,maneRadius);
		ctx.save();
		ctx.translate(0,-2 * maneRadius / 3);
		drawLionArms(ctx,maneRadius);
		ctx.restore();
		drawLionLegGap(ctx,maneRadius);
		ctx.restore();
	};

	var drawLionLeg = function(ctx,maneRadius) {

		var legWidth = maneRadius / 3.5;

		ctx.save();
		ctx.beginPath();
		ctx.ellipse(0,0,maneRadius / 10,legWidth,0,Math.PI,false);
		ctx.fill();
		ctx.save();
		ctx.translate(0,-legWidth);
		drawLionClaws(ctx,maneRadius);
		ctx.restore();
		ctx.restore();
	};

	var drawLionClaws = function(ctx,maneRadius) {

		var clawSeparation = maneRadius / 50;
		var clawLength = maneRadius / 20;
		var lineWidth = maneRadius / 64;

		ctx.save();
		ctx.save();
		ctx.translate(clawSeparation,0);
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.moveTo(0,0);
		ctx.lineTo(0,clawLength);
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.translate(-clawSeparation,0);
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.moveTo(0,0);
		ctx.lineTo(0,clawLength);
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.restore();
		ctx.restore();
	};

	var drawLionLegs = function(ctx,maneRadius) {

		var legGap = 15 * maneRadius / 16;
		var legDistance = -maneRadius / 10;
		var legRotation = Math.PI / 2;

		ctx.save();
		ctx.translate(legGap,legDistance);
		ctx.rotate(legRotation);
		drawLionLeg(ctx,maneRadius);
		ctx.restore();
		ctx.save();
		ctx.translate(-legGap,legDistance);
		ctx.rotate(-legRotation);
		drawLionLeg(ctx,maneRadius);
		ctx.restore();
	};

	var drawLionArm = function(ctx,maneRadius) {

		var armWidth = maneRadius / 5;
		var armLength = 7 * maneRadius / 10;

		ctx.save();
		ctx.fillRect(0,0,armWidth,armLength);
		ctx.translate(armWidth / 2,armLength);
		ctx.rotate(Math.PI);
		drawLionClaws(ctx,maneRadius);
		ctx.restore();
	};

	var drawLionArms = function(ctx,maneRadius) {

		var armGap = maneRadius / 5;

		ctx.save();
		ctx.save();
		ctx.translate(-2 * armGap,0);
		drawLionArm(ctx,maneRadius);
		ctx.restore();
		ctx.save();
		ctx.translate(armGap,0);
		drawLionArm(ctx,maneRadius);
		ctx.restore();
		ctx.restore();
	};

	var drawLionLegGap = function(ctx,maneRadius) {

		var lineWidth = maneRadius / 128;
		var gapColor = "rgb(255,160,102)";
		var gapSize = maneRadius / 16;
		var gapDistance = maneRadius / 32;

		ctx.save();
		ctx.save();
		ctx.translate(-gapDistance,0);
		ctx.beginPath();
		ctx.strokeStyle = gapColor;
		ctx.lineWidth = lineWidth;
		ctx.bezierCurveTo(0,0,gapSize,-gapSize,-gapSize,-2 * gapSize);
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.translate(gapDistance,0);
		ctx.beginPath();
		ctx.strokeStyle = gapColor;
		ctx.lineWidth = lineWidth;
		ctx.bezierCurveTo(0,0,-gapSize,-gapSize,gapSize,-2 * gapSize);
		ctx.stroke();
		ctx.restore();
		ctx.restore();
	};

	var drawLionMane = function(ctx,maneRadius) {

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgb(102,51,0)";
		ctx.ellipse(0,0,maneRadius,maneRadius,0,Math.PI * 2,false);
		ctx.fill();
		ctx.restore();
	};

	var drawLionHead = function(ctx,headLength,jawLength) {

		ctx.save();
		drawLionEarPair(ctx,headLength);
		ctx.beginPath();
		ctx.ellipse(0,0,headLength,headLength,0,Math.PI * 2,false);
		ctx.fill();
		drawLionEyes(ctx,headLength);
		ctx.save();
		ctx.translate(-headLength / 8,headLength / 4);
		drawLionMouth(ctx,headLength,jawLength);
		ctx.restore();
		drawLionNose(ctx,headLength);
		ctx.restore();
	};

	var drawLionEar = function(ctx,headLength) {

		var earLength = headLength / 8;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,153,255)";
		ctx.arc(0,0,earLength,0,2 * Math.PI,true);
		ctx.fill();
		ctx.strokeStyle = "rgb(255,178,102)";
		ctx.lineWidth = earLength;
		ctx.stroke();
		ctx.restore();
	};

	var drawLionEarPair = function(ctx,headLength) {

		var earPositionX = 3 * headLength / 4;
		var earPositionY = -7 * headLength / 10;

		ctx.save();
		ctx.translate(-earPositionX,earPositionY);
		drawLionEar(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.translate(earPositionX,earPositionY);
		drawLionEar(ctx,headLength);
		ctx.restore();
	};

	var drawLionEye = function(ctx,headLength) {

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.ellipse(0,0,headLength / 20,headLength / 8, 0,Math.PI * 2,false);
		ctx.fill();
		ctx.restore();
	};

	var drawLionEyes = function(ctx,headLength) {

		var eyeDistance = headLength / 4;

		ctx.save();
		ctx.translate(0,-eyeDistance);
		ctx.save();
		ctx.translate(-eyeDistance,0);
		drawLionEye(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.translate(eyeDistance,0);
		drawLionEye(ctx,headLength);
		ctx.restore();
		ctx.restore();
	};

	var drawLionMouth = function(ctx,headLength,jawLength) {

		ctx.save();
		ctx.fillStyle = "rgb(255,102,102)";
		ctx.fillRect(0,0,headLength / 4,jawLength);
		drawLionTeeth(ctx,headLength,jawLength);
		ctx.restore();
	};

	var drawLionTooth = function(ctx,headLength,jawLength) {

		var toothWidth = headLength / 8;
		var toothHeight = headLength / 10;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.moveTo(0,0);
		ctx.lineTo(toothWidth,0);
		ctx.lineTo(toothWidth / 2,toothHeight);
		ctx.fill();
		ctx.restore();
	};

	var drawLionToothPair = function(ctx,headLength,jawLength) {

		ctx.save();
		drawLionTooth(ctx,headLength,jawLength);
		ctx.save();
		ctx.translate(headLength / 8,0);
		drawLionTooth(ctx,headLength,jawLength);
		ctx.restore();
		ctx.restore();		
	};

	var drawLionTeeth = function(ctx,headLength,jawLength) {

		ctx.save();
		drawLionToothPair(ctx,headLength,jawLength);
		ctx.save();
		ctx.translate(headLength / 4,jawLength);
		ctx.rotate(Math.PI);
		drawLionToothPair(ctx,headLength,jawLength);
		ctx.restore();
		ctx.restore();
	};

	var drawLionNose = function(ctx,headLength) {

		var noseLength = headLength / 8;

		ctx.save();
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgb(51,25,0)";
		ctx.strokeStyle = "rgb(51,23,0)";
		ctx.moveTo(-noseLength / 2,0);
		ctx.lineTo(noseLength / 2,0);
		ctx.lineTo(0,noseLength);
		ctx.fill();
		ctx.restore();
		ctx.save();
		ctx.translate(0,noseLength / 4);
		drawLionWhiskers(ctx,headLength);
		ctx.restore();
		ctx.restore();
	};

	var drawLionWhisker = function(ctx,headLength) {

		var whiskerLength = headLength / 2;

		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.moveTo(0,0);
		ctx.lineTo(-whiskerLength,0);
		ctx.lineWidth = headLength / 64;
		ctx.stroke();
		ctx.restore();
	};
	var drawLionWhiskers = function(ctx,headLength) {

		var whiskerAngle = Math.PI / 12;

		ctx.save();
		drawLionWhisker(ctx,headLength);
		ctx.save();
		ctx.rotate(Math.PI);
		drawLionWhisker(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.rotate(whiskerAngle);
		drawLionWhisker(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.rotate(-whiskerAngle);
		drawLionWhisker(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.rotate(11 * whiskerAngle);
		drawLionWhisker(ctx,headLength);
		ctx.restore();
		ctx.save();
		ctx.rotate(-11 * whiskerAngle);
		drawLionWhisker(ctx,headLength);
		ctx.restore();
		ctx.restore();
	};
}());
