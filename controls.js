var keys = {
	"jump" : false,
	"left" : false,
	"right" : false
};


window.addEventListener('keydown', function(e){

	switch(e.keyCode){
						case 37:	
							keys["left"] = true;
							player.left = true;	
							// player.x -= 5;			
							break;
							
						case 38:							
							keys["up"] = true;
							// player.canJump = false;

								// player.y -= 5;
								break;
						case 39:
		
							keys["right"]= true;
							player.right = true;
							// player.x += 5;
						
						
						
							break;
						case 40:

							keys["down"] = true;
							// player.y += 5;
							break;
						case 90: // z

							keys["jump"] = true;


							break;
					}
					// console.log(keys);
					// player.draw(ctx);

	});


window.addEventListener('keyup', function(e){
	switch(e.keyCode){
						case 37:
							// if player is in air
							keys["left"] = false;
							player.left = false;
							
							break;			
						case 38:
							keys["up"] = false;
								break;
						case 39:
							keys["right"] = false;
							player.right = false;

						
							break;
						case 40:

							keys["down"] = false;
							break;
						case 90: // z

							keys["jump"] = false;

							break;
					}
					console.log(keys);
});