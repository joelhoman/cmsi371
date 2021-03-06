$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

    var poop = new Image();
	poop.src = "../sprites/poop.png";
	poop.loaded = false;
    poop.addEventListener("load",function () {
	    poop.loaded = true;
	}, false);

	SpriteLibrary.drawPoop = function (poopInst) {

		var ctx = poopInst.ctx || document.getElementById("canvas").getContext("2d");

		if(poop.loaded){
	    	ctx.drawImage(poop,0,0,poop.width / 8,poop.height / 8);
	    }
	}
}());
