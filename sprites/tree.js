$(function(){

	window.SpriteLibrary = window.SpriteLibrary || {};

	SpriteLibrary.drawTree = function(treeInst) {

		var ctx = treeInst.ctx || document.getElementById("canvas").getContext("2d");
		var treeCurve = treeInst.treeCurve || 0;

		var treeHeight = 100;
		var treeWidth = treeHeight / 16;

		ctx.save();
		ctx.fillStyle = "rgb(255,255,130)";
		drawTreeTrunk(ctx,treeHeight,treeWidth,treeCurve);
		drawTreeBranches(ctx,treeHeight,treeWidth,treeCurve);
		drawTreeLeaves(ctx,treeHeight,treeCurve);
		ctx.restore();
	};

	var drawTreeTrunk = function(ctx,treeHeight,treeWidth,treeCurve) {

		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "rgb(255,255,130)";
		ctx.lineWidth = treeWidth;
		ctx.bezierCurveTo(0,0,treeCurve,-treeHeight / 2,0,-treeHeight);
		ctx.stroke();
		ctx.restore();
	};

	var drawTreeBranches = function(ctx,treeHeight,treeWidth,treeCurve) {

		ctx.save();
		ctx.translate(0,-treeHeight);
		rotateTreeTop(ctx,treeCurve);
		ctx.save();
		ctx.rotate(3 * Math.PI / 4);
		ctx.fillRect(0,0,treeWidth,treeHeight / 4);
		ctx.restore();
		ctx.save();
		ctx.rotate(8 * Math.PI / 6);
		ctx.translate(0,-treeWidth);
		ctx.fillRect(0,0,treeWidth,treeHeight / 6);
		ctx.translate(0,treeHeight / 6);
		ctx.rotate(Math.PI / 2);
		ctx.fillRect(0,0,treeWidth,-treeHeight / 7);
		ctx.restore();
		ctx.restore();
	};

	var drawTreeLeaves = function(ctx,treeHeight,treeCurve) {

		var leafRadius = treeHeight / 8;
		
		ctx.save();
		ctx.translate(0,-treeHeight - (2 * leafRadius));
		rotateTreeTop(ctx,treeCurve);
		ctx.beginPath();
		ctx.fillStyle = "rgb(51,102,0)";
		ctx.ellipse(0,0,6 * leafRadius,leafRadius,0,Math.PI * 2,false);
		ctx.fill();
		ctx.restore();
	};

	var rotateTreeTop = function(ctx,treeCurve) {

		ctx.rotate(-treeCurve / 2 * Math.PI / 180);
	};

}());
