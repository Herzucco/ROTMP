var BoxColliderComponent = function(proto){
    proto.checkCollisions = function(){
        var list = BoxColliderComponent.boxList;
        var length = list.length;
        var collider = this.get("boxCollider");
        var center = collider.center;

        for(var i = 0; i < length; i++){
            var other = list[i];
            var otherCollider = other.get("boxCollider");

            if(this.id === other.id){
                continue;
            };

            var overlap = this.checkAABB(collider, otherCollider);
            if(overlap){
                if(collider.colliding){
                    this.onCollisionStay(other, overlap);
                }
                else{
                    collider.colliding = true;
                    if(collider.rigidBody === true && otherCollider.rigidBody === true)
                        this.resolveCollision(other, overlap);

                    this.onCollisionEnter(other, overlap);
                }
                break;
            }
            else{
                if(collider.colliding){
                    this.onCollisionExit(other);
                }
                collider.colliding = false;
            }
        };
    };

    proto.onCollisionEnter = function(other, overlap){

    };

    proto.onCollisionExit = function(other){

    };

    proto.onCollisionStay = function(other, overlap){

    };

    proto.resolveCollision = function(other, overlap){
        console.log("olo")
        var velocity = this.get("velocity");
        var acceleration = this.get("acceleration");

        if(this.get("boxCollider").dynamic)
            this.applyForce({x : -((velocity.x + acceleration.x)*2), y : -((velocity.y + acceleration.y)*2)});
    }

    proto.setColliderCenter = function(collider){
        collider.center.x = collider.position.x + collider.size.width/2;
        collider.center.y = collider.position.y + collider.size.height/2;
    };

    proto.checkAABB = function(aabb1,aabb2){
        var distance = {
            x : Math.abs(aabb1.center.x - aabb2.center.x),
            y : Math.abs(aabb1.center.y - aabb2.center.y)
        };
        var somme    = {
            x : aabb1.size.width / 2 + aabb2.size.width / 2,
            y : aabb1.size.height / 2 + aabb2.size.height / 2
        }
        var overlap = Vectors.sub(somme, distance);
        if(overlap.x >= 0 && overlap.y >= 0)
            return overlap;

        return false;
    };

    proto.updatePosition = function(){
        var collider = this.get("boxCollider");
        var position = this.get("position");

        collider.position.x = position.x + collider.relativePosition.x;
        collider.position.y = position.y + collider.relativePosition.y;
        this.setColliderCenter(collider);
    }

    BoxColliderComponent.boxList.push(this);
}

BoxColliderComponent.boxList = [];