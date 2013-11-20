var MoveComponent = function(proto){
	proto.move = function(){
		this.applyAcceleration();
		this.applyVelocity();
		this.clearForces();
		this.setFriction();
	}
	proto.applyForce = function(force) {
		this.set("acceleration", Vectors.add(this.get("acceleration"), force));
	};
	proto.applyAcceleration = function() {
		this.set("velocity", Vectors.add(this.get("velocity"), this.get("acceleration")));
	};
	proto.applyVelocity = function(){
		this.set("position", Vectors.add(this.get("position"), this.get("velocity")));
	}
	proto.clearForces = function(){
		this.set("acceleration", Vectors.mult(this.get("acceleration"), 0));
	}
	proto.setFriction = function(){
		this.set("velocity", Vectors.mult(this.get("velocity"), this.get("friction")));
	}
}