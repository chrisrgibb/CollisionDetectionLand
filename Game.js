var Game = function(argument) {

	

};

Game.draw = function(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0 , WIDTH, HEIGHT);

	if(player){
		player.draw(ctx);
	}
	if(level){
		level.draw();
	}
	if(debug){
		debug.draw();
	}

}


Game.update = function(){
	if(player){
		player.move();
	}

}

Game.run = function(){
	Game.update();
	Game.draw();
	requestAnimationFrame(Game.run);



}