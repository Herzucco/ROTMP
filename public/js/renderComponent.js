var RenderComponent = function(proto){
	proto.render = function(){
		var context = this.get("context");
		var color = this.get("color");
		var pattern = this.get("pattern");
		var position = this.get("position");
		var size = this.get("size");

		context.save();
		context.fillStyle = pattern || color;
		context.fillRect(position.x, position.y, size.width, size.height);
		context.restore();
	}
}