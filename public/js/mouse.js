var Mouse = Model.extend(function(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(MoveComponent);
	this.init(params, eventManager);
});

Mouse.prototype.init = function init(params){
	this.set({
		speed : params.speed || {x : 0, y : 0},
		speedLimit : params.speedLimit || 2,
		context : params.context,
		canvas : params.canvas,
		position : params.position || {x : 0, y : 0},
		size : params.size || {width : 0, height : 0},
		slot : params.slot,
		velocity : params.velocity || {x : 0, y : 0},
		color : params.color || "white",
		acceleration : {x : 0, y : 0},
		player : params.player
	});
    
    this.observeEvents(params)
}
Mouse.prototype.mouseCoord = function(el,event){
	var mouseX = -el.offsetLeft;
	var mouseY = -el.offsetTop;
	while(el=el.offsetParent)
	{
		mouseX += el.scrollLeft - el.offsetLeft;
		mouseY += el.scrollTop - el.offsetTop;
	}

	return {x:event.clientX + mouseX , y:event.clientY + mouseY};
}

Mouse.prototype.observeEvents = function(params){
    var _self = this;
    
    params.canvas.onmousemove = function(e)
	{
		var coords = _self.mouseCoord(this,e);
		_self.set("position", coords);
	};

	params.canvas.onclick = function(event)
	{
		_self.playerCall();
	}
}

Mouse.prototype.run = function(){

}

Mouse.prototype.playerCall = function(){
	this.eventManager.trigger("click", [{position : this.get("position")}]);
}