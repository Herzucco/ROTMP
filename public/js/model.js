var Model = function Model(attributes, eventManager){
	this.eventManager = eventManager || new EventController();
	this.id = attributes.id || Model.generateID();
	this.attributes = {};

	Model.list.push(this);
	Model.models[this.id] = this;
	Model.number++;
}

Model.number = 0;
Model.list = [];
Model.models = {};
Model.generateID = function(){
	return this.identifier + "_" + this.number;
}

Model.prototype.set = function(key, value){
	if(typeof key === "object"){
		for(var i in key){
			this.attributes[i] = key[i];
			this.eventManager.trigger(this.id+"change:"+i, key[i], [this]);
			this.eventManager.trigger(this.id+"change", [this]);
		}
	}
	else{
		this.attributes[key] = value;
		this.eventManager.trigger(this.id+"change:"+i, key[i], [this]);
		this.eventManager.trigger(this.id+"change", [this]);
	}

	return this;
}

Model.prototype.get = function(key){
	return this.attributes[key];
}

Model.prototype.require = function(){
	var components = arguments;
	for(var i = 0; i < components.length; i++){
		components[i].call(this, this.constructor.prototype);
	}
}

Model.prototype.run = function(){

};

Model.prototype.destroy = function(){
    this.TODESTROY = true;
    this.run = function(){};
}

Model.destroy = function(){
    for(var i = 0; i < this.list.length; i++){
        if(this.list[i].TODESTROY === true){
            delete this.models[this.list[i].id];
            this.list.splice(i, 1);
            i--;
        }
    }
};

Model.extend = function(constructor){
	constructor.prototype = Object.create(Model.prototype);
	return constructor;
}

Model.update = function(){
	for(var i = 0; i < this.list.length; i++){
		if(typeof this.list[i].run === "function"){
			this.list[i].run();
		}
	}
    Model.destroy();
}

Model.generateIdentifier = function(identifier){
	this.identifier = identifier;
}