var Connector = Model.extend(function Connector(params, eventManager){
	Model.call(this, params, eventManager);
	this.socket = io.connect('/');
	this.observeEvents();
});

Connector.prototype.observeEvents = function(){
	var self = this;
}