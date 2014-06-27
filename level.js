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
		[0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
		[0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
		[0,1,0,1,1,0,0,0,1,1,0,0,1,0,0,0],
		[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
	];
	var tilesToHighlight = [];


// Level.init = function(){

// 	// this.tileMap = 


// }
	function mapWidth(){
		return map[0].length;
	}
	function mapHeight(){
		return map.length;
	}

	function getTile(x, y){
		return map[y][x];

	}

	function draw(){
		
		for(var row = 0; row < map.length; row++ ){
				for(var col = 0; col < map[0].length; col++){
					if(map[row][col]==1){
						ctx.fillStyle = "green";
						ctx.fillRect(col * 32, row * 32, 32, 32);
						// ctx.drawImage(tiles[0],col * 32, row * 32,  16*2, 16*2);
					}
					
			}
		}
		highLightTiles();

	}

	function addToHighLights(x, y){
		var tempTile = [x, y];
		tilesToHighlight.push(tempTile);
	}

	function highLightTiles(){
		ctx.fillStyle = "white";
		for(var i =0; i< tilesToHighlight.length; i++){
			
			var col = tilesToHighlight[i][0];
			var row = tilesToHighlight[i][1];
			ctx.fillRect(col * 32, row * 32, 32, 32);
		}
		tilesToHighlight = [];
	}



	return { draw : draw,
			 getTile : getTile,
			 mapWidth : mapWidth
			 ,mapHeight : mapHeight,
			 addToHighLights : addToHighLights
			};

};
