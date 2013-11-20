var Wall = Model.extend(function(params, eventManager){
    Model.call(this, params, eventManager);

    this.require(RenderComponent, BoxColliderComponent);
    this.init(params, eventManager);
});

Wall.prototype.init = function init(params){
    this.set({
        context : params.context,
        position : params.position || {x : 0, y : 0},
        size : params.size || {width : 0, height : 0},
        color : params.color || "white",
        boxCollider : {
            center : {
                x : 0,
                y : 0
            },
            position : params.position || {x : 0, y : 0},
            size : params.size || {width : 0, height : 0},
            relativePosition : params.relativePosition || {x : 0, y : 0},
            colliding : false,
            rigidBody : true,
            dynamic : false,
        },
    });
};

Wall.prototype.run = function(){
    this.updatePosition();
    this.render();
    this.checkCollisions();
}