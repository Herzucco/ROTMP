var LifeComponent = function(proto){
	proto.life = function(){
		this.displayLife();
		this.actionLife();
		this.checkLife();
	}

	proto.displayLife = function(lalife){
		var context = this.get("context");
		var position = this.get("position");

		context.beginPath();
	    context.rect(position.x - 3, position.y + 18, 25, 8);
	    context.fillStyle = "black";
	    context.fill();
	    context.closePath();
	    
	    context.beginPath();
	    var width = this.maxWidth * this.health / this.maxHealth;
	    context.rect(position.x - 5, position.y + 20, this.get("life")*2, 5);
	    context.fillStyle = "green";
	    context.fill();
	    context.closePath();
	}

	proto.actionLife = function(amount){
			this.set("life", this.get("life") + amount);	
	}

	proto.checkLife = function(){
		if(this.get("life") <= 0)
		{
			this.die();
		}
	}

    proto.die = function(){
        this.destroy();
    }
}