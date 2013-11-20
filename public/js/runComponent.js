var RunComponent = function(proto, functions){
	proto.run = function(){
		for(var i = 0; i < functions.length; i++){
			this[functions[i]]();
		}
	}
}