var EventController = function(){
	this.events = {};
}

EventController.prototype.on = function(eventName, callback, instance){
	if(!this.events[eventName])
		this.events[eventName] = [];

	this.events[eventName].push({callback : callback, instance : instance});
}

EventController.prototype.trigger = function(events, arguments, instance){
	if(!Array.isArray(events))
		events = [events];
	for(var i = 0; i < events.length; i++){
		var eventName = events[i];
		var splitName = eventName.split("*");
		if(splitName.length <= 1){
			if(!this.events[eventName])
			continue;

			if(!Array.isArray(arguments))
				instance = arguments;

			for(var o = 0; o < this.events[eventName].length; o++){
				this.events[eventName][o].callback.apply(instance || this.events[eventName][o].instance, arguments);
			};
		}
		else{
			for(var x in this.events){
				if(x.indexOf(splitName[1]) > -1)
				{
					var eventName = x;
					if(!Array.isArray(arguments))
						instance = arguments;

					for(var o = 0; o < this.events[eventName].length; o++){
						this.events[eventName][o].callback.apply(instance || this.events[eventName][o].instance, arguments);
					};
				}
			}
		}
	}
}
