$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

	SpriteLibrary.drawSunrise = function (sunriseInst) {

		var ctx = sunriseInst.ctx || document.getElementById("canvas").getContext("2d");

		ctx.save();
	    var sunrise = new Image();
	    sunrise.src = "/../toon/sunrise.jpg";
	    ctx.drawImage(sunrise,0,0,sunrise.width / 6,sunrise.height / 6);
	    ctx.restore();
	}
}());