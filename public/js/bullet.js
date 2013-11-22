var Bullet = Model.extend(function(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(MoveComponent, RenderComponent, BoxColliderComponent);
	this.init(params, eventManager);
});

Bullet.prototype.init = function init(params){
	this.set({
		speed : params.speed || {x : 0, y : 0},
		speedLimit : params.speedLimit || 2,
		context : params.context,
		position : params.position || {x : 0, y : 0},
		size : params.size || {width : 0, height : 0},
		velocity : params.velocity || {x : 0, y : 0},
		color : params.color || "white",
		acceleration : {x : 0, y : 0},
		boxCollider : {
            center : {
                x : 0,
                y : 0
            },
            rigidbody : false,
            position : params.position || {x : 0, y : 0},
            size : params.size || {width : 0, height : 0},
            relativePosition : params.relativePosition || {x : 0, y : 0},
            colliding : false,
        },
        friction : params.friction || 0.5,
        playerID : params.playerID,
        camPosition : params.camPosition,
	});
	this.observeEvents();
	this.calculate();
};

Bullet.prototype.observeEvents = function(){
	
}

Bullet.prototype.calculate = function(){

	var position = this.get("position");
	var speed = this.get("speed");
	var cam = this.get("camPosition");
    
	var direction = Vectors.sub(cam, position)
    
	direction = Vectors.normalize(direction);
	this.applyForce(Vectors.mult(direction, speed));
}


Bullet.prototype.run = function(out){
	
		this.updatePosition();
	    this.render();
	    this.checkCollisions();
	    this.move();
	    this.checkPosition();	
}

Bullet.prototype.checkPosition = function(){
	var position = this.get("position");
	if(position.x >1800 && position.y >1200)
	{
		this.destroy();
	}
}

Bullet.prototype.onCollisionEnter = function(other){
    // var life = other.get("life");
    // if(life !== undefined && other.id !== this.get("playerID")){
    //     other.actionLife(-5)
    // }
}