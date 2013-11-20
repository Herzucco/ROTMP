var addKeyEvent = function(element, e, keycode, callback, instance){
	element.addEventListener(e, function(e){
		if(e.keyCode === keycode){
			callback.apply(instance || {}, e);
		}
	})
}