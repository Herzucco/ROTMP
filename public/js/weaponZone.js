var Zone = Model.extend(function(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(RenderComponent, BoxColliderComponent);
	this.init(params, eventManager);
});

Zone.prototype.init = function init(params){
	this.set({
		context : params.context,
		position : params.position || {x : -100, y : -100},
		size : params.size || {width : 60, height : 60},
		slot : params.slot,
		color : params.color || "white",
        boxCollider : {
            center : {
                x : 0,
                y : 0
            },
            position : params.position || {x : -100, y : -100},
            size : params.size || {width : 60, height : 60},
            relativePosition : params.relativePosition || {x : 0, y : 0},
            colliding : false,
            rigidBody : false,
            dynamic : false,
        },
        count : 60,
        typeWeapon : params.typeWeapon
	});
	this.observeEvents();
};
Zone.prototype.run = function(){
	this.checkCollisions();
	this.updatePosition();
	var position = this.get("position");
	var count = this.get("count");
	count -=0.04;
	this.set("count", count);
	count = Math.round(count);
	this.render(position.x,position.y);

	if(count <= 0)
	{
		position.x = Math.random()*580;
		position.y = Math.random()*380;
		this.set("count", 60)
		this.set("position", position)
	}
}

Zone.prototype.render = function(x,y){
	var context = this.get("context");
	var color = this.get("color");
	context.beginPath();
	context.arc(x+30, y+30, 35, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'white';
	context.stroke();
	
}


Zone.prototype.observeEvents = function(){

}
