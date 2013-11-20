var StaticSquare = Model.extend(function(params, eventManager){
	Model.call(this, params, eventManager);

	this.require(RenderComponent);
	this.init(params, eventManager);
});
StaticSquare.prototype.init = function init(params, eventManager){
	this.set({
		context : params.context,
		position : params.position || {x : 0, y : 0},
		size : params.size || {width : 0, height : 0},
		color : params.color || "white",
	});
};

StaticSquare.prototype.run = function(){
	this.render();
}
