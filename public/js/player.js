var Player = Model.extend(function(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(RenderComponent, LifeComponent, BoxColliderComponent, WeaponComponent, ScoreComponent, NickNameComponent);
	this.init(params, eventManager);
});
Player.prototype.init = function init(params){
	this.set({
		speed : params.speed || {x : 0, y : 0},
		speedLimit : params.speedLimit || 2,
		context : params.context,
		position : params.position || {x : 0, y : 0},
		size : params.size || {width : 0, height : 0},
		slot : params.slot,
		velocity : params.velocity || {x : 0, y : 0},
		color : params.color || "white",
		acceleration : {x : 0, y : 0},
		life : 10,
		typeOfWeapon : "basic",
		score : 0,
        nickName : params.nickName || "player",
        boxCollider : {
            center : {
                x : 0,
                y : 0
            },
            position : params.position || {x : 0, y : 0},
            size : params.size || {width : 0, height : 0},
            relativePosition : params.relativePosition || {x : 0, y : 0},
            colliding : false,
            rigidBody : true,
            dynamic : true,
        },
        friction : params.friction || 1,
        state : "dead",
        count : 5
	});
	this.observeEvents();
};
Player.prototype.run = function(){
	var state = this.get("state");
	switch(state)
	{
		case "alive" : this.runAlive();
		break;
		case "dead" : this.runDead(this.get("count")); 
		break;
	}

}

Player.prototype.runAlive = function(){
	    this.updatePosition();
		this.render();
		this.displayLife();
	    this.displayNickName();
	    this.checkLife();
}

Player.prototype.runDead = function(count){
	count -=0.015;
	this.set("count", count);
	count = Math.round(count);
	this.cooldown(count,"Respawn dans:" );
	if(count <= 0)
	{
		this.set("state", "alive");
		this.set("life", 10);
	}

}

Player.prototype.cooldown= function(countDown, message){
		var context = this.get("context");
		context.font="40px Arial";
		context.fillStyle = "white";
		context.fillText(message +"  "+ countDown , 150, 150);
}


Player.prototype.observeEvents = function(){
	this.eventManager.on("newPosition"+this.id,function(position, collider, mainID){
        if(this.id !== mainID){
            this.set("position", position);
            this.set("collider", collider);
        }
	}, this);
	
};

Player.prototype.onCollisionEnter = function(other, overlap){
	var newTypeOfWeapon = other.get("typeWeapon");
	if(newTypeOfWeapon != undefined)
	{
		this.set("typeOfWeapon", newTypeOfWeapon); 	
	}
}

