var Level = function() {
	this.tileMap = [];
	var map = [
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
		[0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
	];



// Level.init = function(){

// 	// this.tileMap = 


// }
	function mapWidth(){
		return map[0].length;
	}

	function getTile(x, y){
		return map[y][x];

	}

	function draw(){
		ctx.fillStyle = "green";
		for(var row = 0; row < map.length; row++ ){
				for(var col = 0; col < map[0].length; col++){
					if(map[row][col]==1){
						ctx.fillRect(col * 32, row * 32, 32, 32);
						// ctx.drawImage(tiles[0],col * 32, row * 32,  16*2, 16*2);
				}	
			}
		}
	}


	return { draw : draw,
			 getTile : getTile,
			 mapWidth : mapWidth
			};

};
