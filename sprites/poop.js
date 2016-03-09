$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

	SpriteLibrary.drawPoop = function (poopInst) {

		var ctx = poopInst.ctx || document.getElementById("canvas").getContext("2d");

		ctx.save();
	    var poop = new Image();
	    poop.src = "/../toon/poop.png";
	    ctx.drawImage(poop,0,0,poop.width / 6,poop.height / 6);
	    ctx.restore();
	}
}());