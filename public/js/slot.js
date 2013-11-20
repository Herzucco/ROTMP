var Slot = Model.extend(function Slot(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(RenderComponent);
	this.init(params, eventManager);
});
Slot.prototype.init = function(params, eventManager){
	var position = {x : params.position.x+(params.x*params.size.width), y : params.position.y+(params.y*params.size.height)};
	this.set({
		context : params.context,
		index : params.index,
		size : params.size || {width : 0, height : 0},
		position : position,
		full : params.full || false,
		color : params.color || "white",
	});
};

Slot.prototype.run = function(){
	this.render();
}

SlotManager = Model.extend(function SlotManager(params, eventManager){
	Model.call(this, params, eventManager);
	this.init(params, eventManager);
});
SlotManager.prototype.init = function(params, eventManager){
	params.position = params.position || { x : 0, y : 0};
	this.set({
		slots : [],
		ratio : params.ratio || {x : 0, y : 0},
		position : params.position,
	})
	for(var i = 0; i < params.ratio.y; i++){
		for(var o = 0; o < params.ratio.x; o++){
			params.x = o;
			params.y = i;
			this.get("slots").push(new Slot(params, eventManager));
		}
	}
};