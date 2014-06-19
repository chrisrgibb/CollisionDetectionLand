function Player(){

	this.x = 5;
	this.y = 6;
	this.width = 20;
	this.height= 38;
	this.yVel = 0;
	this.xVel = 0;
	this.speed = 5;
	this.gravity = .6;
	this.friction = .5;

	this.jumping = false;
	this.left = false;
	this.right = false;
	this.onGround = false;
	this.canJump = true;
}


Player.prototype.move2 = function(first_argument) {
	var dX, dY = 0;
	if(this.left){
		if(this.xVel > 0){
			this.xVel = 0;
		}
		if(this.xVel > -this.speed){
			this.xVel --;
		}

		dX = this.xVel;

		var nextX = this.x + dX - (this.width/2) ;
		var ax = nextX / 32 | 0; // index of the tile to the left

		var tileLeft = level.getTile(ax, this.y/32 | 0);
		if(tileLeft==1) {
			this.x = ( (ax+1) * 32) + (this.width/2) ; // 
		}else { 
			this.x = this.x + dX;
		}

	}else if( keys["right"] ){

		if(this.xVel< 0){
			this.xVel = 0;
		}

		if(this.xVel < this.speed){
			this.xVel ++;
		}

		console.log("right here");
		dX = this.xVel;
		var nextX = this.x + dX + (this.width/2); // the nextX 
		var ax =  nextX / 32 | 0; // the index of the next tile 
		
		var tileX = level.getTile(ax, this.y/32 | 0);
		if(tileX==1){ // collision
			this.x = (ax * 32) - (this.width/2);
		}else{
			this.x =this.x +dX;
		}
	}


	// jumping
	if ( keys["up"] && !this.jumping && this.canJump && jumpKeyReleased){
		

		if(this.onGround){
			this.canJump = false;
		}
		this.yVel = -this.speed*2;
		this.jumping = true;
		this.onGround = false;
		jumpKeyReleased =false;
	}


	this.yVel += this.gravity;	
	dY = this.yVel;


	// check up collisions 
	if(this.jumping){
		console.log(dY);
		var nextY = this.y + dY + (this.height/2) ;//- 10;
		var ay = (this.y -(this.height/2) + dY - 10) /32 | 0;
		var leftTile  = level.getTile((this.x- (this.width/2)  )/32  | 0, ay);
		var rightTile = level.getTile((this.x + (this.width/2))/32   | 0, ay );
		if(leftTile==1 || rightTile==1){
			this.y = ( (ay+1) * 32) + (this.height/2);
		}
	}



	// check down collisions


		var nextY = this.y + dY - (this.height/2);
		var ay = (this.y +(this.height/2) + dY) / 32 | 0;


		var leftTile  = level.getTile((this.x - (this.width/2)  )/32  | 0, ay);
		var rightTile = level.getTile((this.x + (this.width/2) -4 )/32   | 0, ay ); // the minus for is 

		if((leftTile==1 || rightTile==1 )   ) {
			// if(dY < 0){
			// 	console.log(dY);
			// }
			this.y = (ay * 32) - (this.height/2);

			this.onGround = true;
			this.jumping = false;
			this.canJump = true;
			this.yVel = 0;
		}else {
			// must be falling
			this.onGround = false;
			this.y = this.y + dY;
		}

	// check left of screen
	if(this.x-(this.width/2) < 0){
		this.x = 0 + (this.width/2);
	}
	if(this.x+(this.width/2) > level.mapWidth()*32){
		this.x = (level.mapWidth()*32)- (this.width/2);
	}



}

Player.prototype.move = function(first_argument) {
	var dX, dY = 0;
	if(keys["left"]){
		dX = -10;
		var nextX = this.x + dX - (this.width/2) ;
	

		var ax = nextX / 32 | 0; // index of the tile to the left

		var tileLeft = level.getTile(ax, this.y/32 | 0);
		if(tileLeft==1) {
			this.x = ( (ax+1) * 32) + (this.width/2) ; // 
		}else { 
			this.x = nextX;
		}


	}else if( keys["right"] ){
		console.log("right here");
		dX = 10; 
		var ax =  (this.x + dX) / 32 | 0;
		
		var tileX = level.getTile(ax, this.y/32 | 0);
		if(tileX==1){
			console.log("colision")
			this.x = (ax * 32) - (this.width/2);
		}else{
			this.x =this.x +dX;
		}
	}

	if ( keys["up"] && !this.jumping){
		this.yVel = -this.speed*2;
		this.jumping = true;
	}


	this.yVel += this.gravity;
	
	dY = this.yVel;
	// check down collisions
	var nextY = this.y + dY - (this.height/2);
	var ay = (this.y +(this.height/2) + dY) / 32 | 0;


	var downTile = level.getTile(this.x/32 | 0, ay);

	if(downTile==1){ 
		// collision
		console.log("Colish");
		this.y = (ay * 32) - (this.height/2); // -4;  // + 8 ;
		yVel = 0;
	}else {
		// no collision
		this.y = this.y + dY;
	}

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
	ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

	// ctx.drawImage(this.image, frame*16, 0, 16, 26, this.x, this.y, this.height, this.height);
};