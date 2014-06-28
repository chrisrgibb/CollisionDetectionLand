var canvas,
	ctx,
	WIDTH,
	HEIGHT,
	player,
	game,
	level;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	level = new Level();
	player = new Player();
	game = Game();
	player.draw(ctx);
	Game.run();
}

window.addEventListener("load", init);

