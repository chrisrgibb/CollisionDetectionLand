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
	this.blocked = false;
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
	}else if( keys["right"] ){

		if(this.xVel< 0){
			this.xVel = 0;
		}
		if(this.xVel < this.speed){
			this.xVel ++;
		}
		console.log("right here");
		dX = this.xVel;		
	}
	if ( keys["up"] && !this.jumping && this.canJump && jumpKeyReleased){		
		if(this.onGround){
			this.canJump = false;
			this.yVel = -this.speed*2;
			this.jumping = true;
			this.onGround = false;	
			jumpKeyReleased =false;
		}
	}

	var tempX = this.x;
	var tempY = this.y;


	this.yVel += this.gravity;	
	dY = this.yVel;



		// check up collisions 
	if(this.jumping ){
		if(this.xVel==0){
			
		}

		// console.log(dY);
		var nextY = this.y + dY + (this.height/2) ;//- 10;
		var ay = (this.y -(this.height/2) + dY ) /32 | 0;
		var leftTile  = level.getTile((5 + this.x - (this.width/2)  )/32  | 0, ay);
		var rightTile = level.getTile(( -5 + this.x +  (this.width/2))/32   | 0, ay );
		if(leftTile==1 || rightTile==1){
			tempY = ( (ay+1) * 32) + (this.height/2) + 2;
			this.yVel = 0;
		}
	}

	// check down collisions

	// if(dY>0 ){
		var nextY = this.y + dY - (this.height/2);
		var ay = (this.y +(this.height/2) + dY) / 32 | 0;

		


		var leftTile  = level.getTile((this.x - (this.width/2)  )/32  | 0, ay);
		var rightTile = level.getTile((this.x + (this.width/2) - 4 )/32   | 0, ay ); // the minus for is 

		if((leftTile==1 || rightTile==1 )   ) {
			tempY = (ay * 32) - (this.height/2);

			this.onGround = true;
			this.jumping = false;
			this.canJump = true;
			this.yVel = 0;
		}else {
			// must be falling
			this.onGround = false;
			tempY = this.y + dY;
		}
	// }


	// jumping
		if( dX> 0){
			//moving right
			var nextX = this.x + dX + (this.width/2); // the nextX 
			var ax =  nextX / 32 | 0; // the index of the next tile 
			var yTop = (this.y - this.height/2) / 32 | 0;
			var yBotttom = (this.y + this.height/2) / 32 | 0;
			
			var tileX2 = level.getTile(ax, this.y/32 | 0);
			var tileX1 = level.getTile(ax, yTop);
			// var tileX1 = 0;
			// var tileX2 = level.getTile(ax, yBotttom);
			if(tileX1==1 || tileX2==1){ // collision
				tempX = (ax * 32) - (this.width/2);
				xVel = 0;
				
			}else{
				tempX =this.x +dX;
			}
		}else if( dX <0){
			//moving left
			var nextX = this.x + dX - (this.width/2) ;
			var ax = nextX / 32 | 0; // index of the tile to the left

			var tileLeft = level.getTile(ax, this.y/32 | 0);
			if(tileLeft==1) {
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