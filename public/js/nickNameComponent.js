var NickNameComponent = function(proto){
    proto.displayNickName = function(){
        var nickName = this.get("nickName");
        var context = this.get("context");
        var position = this.get("position");

        context.font="14px Arial";
        context.fillStyle = "white";
        context.fillText(nickName, position.x - 15, position.y - 25);
    }
}