var ScoreComponent = function(proto){
	proto.score = function(){
		this.displayScore();
		this.points();
		this.classement();
	}

	proto.displayScore = function(){
		var currentScore = "Score:" + this.get("score");
		var context = this.get("context");
		var position = this.get("position");

		context.font="14px Arial";
		context.fillStyle = "white";
		context.fillText(currentScore, position.x - 15, position.y - 10);

	}

	proto.earnPoints = function(amount){
			this.set("score", this.get("score") + amount)
	}

	proto.classement = function(){

	}

}