var WeaponComponent = function(proto){
	proto.tir = function(camPosition, typeOfWeapon){
		this.bulletSettings(camPosition, typeOfWeapon);
	}
	proto.createBullet = function(camPosition, speed, color, size){
		var position = this.get("position");
		var context = this.get("context");
		eventManager = new EventController({});
		var bullet = new Bullet({
			speed : speed,
			context : context,
			size : {
				width : size,
				height : size,
			},
			position : {
				x : position.x,
				y : position.y
			},
			friction : 1,
			camPosition : camPosition,
			color : color,
		}, eventManager);
	}

	proto.bulletSettings = function(camPosition, currentWeapon){
		var weapons = {};

		switch(currentWeapon)
		{
			case "basic":
			basic : this.createBullet(camPosition, 5, "white", 6);
			break;

			case "gatling":
			this.createBullet(camPosition, 10, "cyan", 6);
			break;

			case "sniper":
			this.createBullet(camPosition, 30, "purple", 7);
			break;

			case "bazooka":
			this.createBullet(camPosition, 2, "orange", 20);
			break;	
		}
	}
}