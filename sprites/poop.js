$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

    var poop = new Image();
	poop.src = "/../toon/poop.png";
    poop.addEventListener("load",function () {
	    poop.loaded = true;
	}, false);

	SpriteLibrary.drawPoop = function (poopInst) {

		var ctx = poopInst.ctx || document.getElementById("canvas").getContext("2d");

		if(poop.loaded){
	    	ctx.drawImage(poop,0,0,poop.width / 6,poop.height / 6);
	    }
	}
}());