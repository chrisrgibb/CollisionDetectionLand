var debug = function(){

	this.debugWords = [];

	this.draw = function(){
		this.debugWords.push("ds");
		if(this.debugWords  > 0){
			for(var i = 0; i< this.debugWords.length; i++){
					ctx.fillStyle = "#fff";
				ctx.font = "bold 18px sans-serif";
				ctx.fillText("x in the hosue", 501, 100);
			}
		}
		// console.log("drawing");
	}


}