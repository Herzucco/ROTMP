var WeaponComponent = function(proto){
	proto.tir = function(camPosition){
		this.createBullet(camPosition); 
	}
	proto.createBullet = function(camPosition){
		var position = this.get("position");
		var context = this.get("context");
		eventManager = new EventController({});
		var bullet = new Bullet({
			speed : 10,
			context : context,
			size : {
				width : 5,
				height : 5,
			},
			position : {
				x : position.x,
				y : position.y
			},
			friction : 1,
			camPosition : camPosition,
			color : "white",
		}, eventManager);
	}
}