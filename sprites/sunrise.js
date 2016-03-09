$(function(){

    window.SpriteLibrary = window.SpriteLibrary || {};

    var sunrise = new Image();
	sunrise.src = "/../toon/sunrise.jpg";
    sunrise.addEventListener("load",function () {
	    sunrise.loaded = true;
	}, false);

	SpriteLibrary.drawSunrise = function (sunriseInst) {

		var ctx = sunriseInst.ctx || document.getElementById("canvas").getContext("2d");

		if(sunrise.loaded) {
			ctx.drawImage(sunrise,0,0,sunrise.width / 6,sunrise.height / 6);
		} 
	}
}());