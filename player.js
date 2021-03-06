function Player(){

	this.x = 5;
	this.y = 6;
	this.width = 20;
	this.height= 38;
	this.yVel = 0;
	this.xVel = 0;
	this.speed = 4;
	this.gravity = .74;
	this.friction = .8;

	this.jumping = false;
	this.left = false;
	this.right = false;
	this.onGround = false;
	this.canJump = true;
	this.blocked = false;

	this.jumpTime = 0;
	this.xjumpSpeed = 0;
	this.yjumpSpeed= 0;
}


Player.prototype.move = function(first_argument) {
	var dX = 0, dY = 0;

	if(this.left){
		if(this.xVel > 0){
			this.xVel = 0;
		}
		if(this.xVel > -this.speed){
			this.xVel --;
		}
		dX = this.xVel;
	}else if( keys["right"] ){

		if(this.xVel< 0){
			this.xVel = 0;
		}
		if(this.xVel < this.speed){
			this.xVel ++;
		}
		dX = this.xVel;		
	}
	if ( keys["up"] ){
		if(!this.jumping && this.canJump && jumpKeyReleased){		
			if(this.onGround){
				this.canJump = false;
				this.yVel = -10;
				this.jumping = true;
				this.onGround = false;	
				jumpKeyReleased =false;
			}
		}
	}else{
		this.jumpTime = 0;
	}

	var tempX = this.x;
	var tempY = this.y;


	this.yVel += this.gravity;	
	dY = this.yVel;

	// this.collisions(this.x, this.y, dX, dY);


	// check up collisions 
	if(this.jumping ){

		var ay = (this.y -(this.height/2) + dY ) /32 | 0;

		var left  = (  5 + this.x - (this.width/2)  )/32   | 0;
		var right = ( -5 + this.x + (this.width/2)  )/32   | 0;

		var leftTile  = level.getTile(left, ay);
		var rightTile = level.getTile(right, ay );

		if(leftTile ==1) {
			level.addToHighLights(left, ay, "#9BF0E9");
		}
		if( rightTile == 1) {
			level.addToHighLights(right, ay, "#9BF0E9");
		}


		if(leftTile==1 || rightTile==1){
			tempY = ( (ay+1) * 32) + (this.height/2) + 2;
			this.yVel = 0;
			dY = 0;
		}
	}

	// check down collisions

		var nextY = this.y + dY - (this.height/2);
		var ay = (this.y +(this.height/2) + dY) / 32 | 0;

		
		var left = (this.x - (this.width/2)  )/32  | 0;
		var right = (this.x + (this.width/2) - 4 )/32   | 0;


		var leftTile  = level.getTile(left, ay);
		var rightTile = level.getTile(right, ay ); // the minus for is 


		if(leftTile ==1) {
			level.addToHighLights(left, ay, "#EDE5E2");
		}
		if( rightTile == 1) {
			level.addToHighLights(right, ay, "#EDE5E2");
		}


		if((leftTile==1 || rightTile==1 )   ) {
			tempY = (ay * 32) - (this.height/2);

			this.onGround = true;
			this.jumping = false;
			this.canJump = true;
			this.yVel = 0;
		}else  {
			// must be falling
			this.onGround = false;
			tempY = this.y + dY;
		}

		if( dX> 0){
			//moving right
			var nextX = this.x + dX + (this.width/2); // the nextX 
			var ax =  nextX / 32 | 0; // the index of the next tile 
			var yTop = (3 + this.y - this.height/2) / 32 | 0;
			var yBotttom = (-3 + this.y + this.height/2) / 32 | 0;
			

			var tileX2 = level.getTile(ax, yBotttom);
			var tileX1 = level.getTile(ax, yTop);

			// For DEBUGGINS
			if(tileX1 ==1) {
				level.addToHighLights(ax, yTop, "#FDB1B1");
			}
			if( tileX2 == 1) {
				level.addToHighLights(ax, yBotttom, "#FDB1B1");
			}

			if(tileX1==1 || tileX2==1){ // collision
				tempX = (ax * 32) - (this.width/2) ;
				// this.xVel = 0;
				
			}else{
				tempX =this.x +dX;
			}
		}else if( dX <0){
			//moving left
			var nextX = this.x + dX - (this.width/2) ;
			var ax = nextX / 32 | 0; // index of the tile to the left

			var yTop = (3 + this.y - this.height/2) / 32 | 0; 
			var yBotttom = (-3 + this.y + this.height/2) / 32 | 0;


			var tileX2 = level.getTile(ax, yBotttom);
			var tileX1 = level.getTile(ax, yTop);

			if(tileX1 ==1) {
				level.addToHighLights(ax, yTop, "#9BF0E9");
			}
			if( tileX2 == 1) {
				level.addToHighLights(ax, yBotttom, "#9BF0E9");
			}


			if(tileX1==1 || tileX2==1){ 
				tempX = ( (ax+1) * 32) + (this.width/2) ; // 
				this.blocked = true;
			}else { 
				tempX = this.x + dX;
				this.blocked = false;
			}
		}	

	this.x = tempX;
	this.y = tempY;


	// check left of screen
	if(this.x-(this.width/2) < 0){
		this.x = 0 + (this.width/2);
	}
	// check right of screen
	if(this.x+(this.width/2) > level.mapWidth()*32){
		this.x = (level.mapWidth()*32)- (this.width/2);
	}
	// check bottom of screen
	if(this.y + (this.height/2) > level.mapHeight()*32){
		this.y = (level.mapHeight()*32)-(this.height/2);
	}
}

// function not actually used
Player.prototype.collisions = function(x, y, dx, dy){
	var collide = false;
	var w = (this.width/2) | 0;
	var h = (this.height/2 ) | 0;
	var tempX = this.x + dx;
	var tempY = this.y + dy;
	if(dx > 0){
		// going right
		if(this.isBlocking(this.x + dx + w, this.y + h)){
			// top
			collide = true;
		}else if (this.isBlocking(this.x + dx + w, this.y - h)) {
			// bottom 
			collide = true
		}
		if(collide){
			tempX = (((this.x + w) / 32 + 1) | 0 ) * 16  -1;
		} 
	}else if(dx < 0){
		if(this.isBlocking(this.x + dx - w, this.y + h)){
			collide =true;
		}else if(this.isBlocking(this.x + dx - w, this.y - h)) {
			collide =true;
		}
		if(collide){
			tempX = (((this.x - w) / 32) | 0 ) * 32 + w;
		} 
	}
	if(dy > 0){
		// going down
		if(this.isBlocking(this.x + w, this.y + dy + h)){
			collide = true;
		} else if( this.isBlocking(this.x - w, this.y + dy + h)){
			collide = true;
		}
		if ( collide ) {
			// tempY = ((this.y - h) / 32) | 0 ) * 32 
		}
	}
}

Player.prototype.isBlocking = function(xx, yy){
	var x = xx / 32 | 0;
	var y = yy / 32 | 0;
	var block = level.getTile(x, y);
	return block==1;
}


Player.prototype.collisionRight = function(){
	var ax = this.x / 32 | 0;
	var ay = this.y /32 | 0;
	return level.getTile(ax, ay)==1;

};

Player.prototype.draw = function(ctx) {
	// var frame = this.counter  % 4;
	// var frame = this.frameIndex % 4 ;


	ctx.fillStyle = "red";
	if(keys["down"]){
		ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height/2);
	}else{
		ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}
	// ctx.drawImage(this.image, frame*16, 0, 16, 26, this.x, this.y, this.height, this.height);
};