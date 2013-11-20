var InputManager = Model.extend(function(params, eventManager){
    Model.call(this, params, eventManager);

    this.init(params, eventManager);
});
InputManager.prototype.init = function init(params){
    this.set({
        keys : {},
        playerID : params.playerID,
    });
    this.get("keys")[params.playerID] = {};
    this.observeEvents();
};

InputManager.prototype.run = function(){
    this.observeKeys()
}

InputManager.prototype.observeEvents = function(){

}
InputManager.prototype.observeKeys = function(){
    var keys = this.get("keys");
    for(var i in keys){
        for(var x in keys[i]){
            if(keys[i][x]){
                this.eventManager.trigger("keyDown"+x+i);
            }
        }
    }
}
InputManager.prototype.addKeyEvent = function(element, e, keycode, callback, instance){
    element.addEventListener(e, function(e){
        if(e.keyCode === keycode){
            callback.apply(instance || {}, e);
        }
    })
};
InputManager.prototype.keyBinding = function(connector){
    var self = this;
    connector.socket.on("inputStatus", function(inputManagerServer){
       self.keys = inputManagerServer.keys;
    })
    this.addKeyEvent(document, "keydown", 40, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][40] = true;
            connector.socket.emit("keyPressed", {
                identifier : Model.identifier,
                key : 40
        })
        })
    this.addKeyEvent(document, "keydown", 39, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][39] = true;
            connector.socket.emit("keyPressed", {
                identifier : Model.identifier,
                key : 39
            })
        })
    this.addKeyEvent(document, "keydown", 37, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][37] = true;
            connector.socket.emit("keyPressed", {
                identifier : Model.identifier,
                key : 37
            })
        })
    this.addKeyEvent(document, "keydown", 38, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][38] = true;
            connector.socket.emit("keyPressed", {
                identifier : Model.identifier,
                key : 38
            })
        })
    this.addKeyEvent(document, "keyup", 40, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][40] = false;
            connector.socket.emit("keyUp", {
                identifier : Model.identifier,
                key : 40
            })
        })
    this.addKeyEvent(document, "keyup", 39, function(){
            var keys = self.get("keys");
            var playerID = self.get("playerID");

            keys[playerID][39] = false;
            connector.socket.emit("keyUp", {
                identifier : Model.identifier,
                key : 39
            })
        })
    this.addKeyEvent(document, "keyup", 37, function(){
        var keys = self.get("keys");
        var playerID = self.get("playerID");

        keys[playerID][37] = false;
        connector.socket.emit("keyUp", {
            identifier : Model.identifier,
            key : 37
        })
    })
    this.addKeyEvent(document, "keyup", 38, function(){
        var keys = self.get("keys");
        var playerID = self.get("playerID");

        keys[playerID][38] = false;
        connector.socket.emit("keyUp", {
            identifier : Model.identifier,
            key : 38
        })
    })
}