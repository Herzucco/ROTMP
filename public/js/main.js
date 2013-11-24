(function(undefined){
	var canvas,context, eventManager, connector, player, inputManager, mouse;
	var init = function(){
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		eventManager = new EventController({});
		connector = new Connector({id : -1}, eventManager);

		connector.socket.on("newIdentifier", function(datas){
            Model.generateIdentifier(datas.identifier);
            var background = initBackground();
            player = initPlayer(datas.nickName);
            mouse = initMouse();
            getPlayers();
            initKeys();
            requestAnimFrame(update);
        });
		connector.socket.on("newPlayer", function(config){
			if(config.id !== player.id){
				config.context = context;
				new Player(config, eventManager);
			}
		});
		connector.socket.on("triggerEvent", function(data){
			eventManager.trigger(data.eventName, data.datas);
		});
		connector.socket.on("newPosition", function(data){
            if(player){
                eventManager.trigger("newPosition"+data.id, [data.position, data.collider, player.id]);
            }
		});
		eventManager.on("newPositionEmit", function(data){
			connector.socket.emit("newPosition", data);
		})
		connector.socket.emit("newIdentifier", true);
	};

	var update = function(){
		requestAnimFrame(update);
		Model.update();
	}
	var initMouse = function(){
		var mouse = new Mouse({
			speed : 20,
			context : context,
			canvas : document.getElementById("canvas"),
			size : {
				width : 5,
				height : 5,
			},
			position : {
				x : 1,
				y : 1
			},
			color : "blue",
			player : player,
		}, eventManager);
		return mouse;
	}
	var initPlayer = function(nickName){
		var x = Math.random()*600, y = Math.random()*400;
		var player = new Player({
			speed : 0.5,
			context : context,
            nickName : nickName,
			size : {
				width : 10,
				height : 10,
			},
			position : {
				x : x,
				y : y
			},
			friction : 0.7,
			color : "red",
		}, eventManager);

		var wallsTabs = [];
		var wallTab = [];
    for (var i = 0; i < 60; i++) {
    	var wallRandom = parseInt(Math.random() * 2);
    	wallTab.push(wallRandom);
    }
    for (var i = 0; i < 40; i++) {
    	wallsTabs.push(wallTab);
    }
    console.log(wallsTabs);
    for (var j = 0; j < wallsTabs.length; j++) {
    for (var i = 0; i < wallTab.length; i++) {
	    var wallPars = parseInt(wallTab[i]);
	    if (wallPars === 1)
	    {
		    var wall = new Wall({
		        context : context,
		        size : {
		            width : 10,
		            height : 10,
		        },
		        position : {
		            x : i*10,
		            y : 0
		        },
		        color : "green",
		    }, eventManager);	    	
	    }
    }
	}

        player.require(MoveComponent, LifeComponent, ScoreComponent, NickNameComponent);
        player.runAlive = function(){
            this.updatePosition();
            this.checkCollisions();
            this.move();
            this.render();
            this.displayLife();
            this.displayScore();
            this.checkLife();
            this.displayNickName();
            this.eventManager.trigger("newPositionEmit", [{position : this.get("position"), id : this.id, collider : this.get("collider")}]);
        };
         eventManager.on("click",function(){
            var camPosition = mouse.get("position")
         	if(this.get("state") === "alive")
         	{
            	this.tir(camPosition);
         	}
        }, player)
        eventManager.on("keyDown"+40+player.id,function(){
           	this.applyForce({x : 0, y : 1});
        }, player)
        eventManager.on("keyDown"+38+player.id,function(){
            this.applyForce({x : 0, y : -1});
        }, player)
        eventManager.on("keyDown"+37+player.id,function(){
            this.applyForce({x : -1, y : 0});
        }, player)
        eventManager.on("keyDown"+39+player.id,function(){
            this.applyForce({x : 1, y : 0});
        }, player);
		connector.socket.emit("newPlayer", {
			id : player.id,
			speed : 0.5,
            nickName : nickName,
			size : {
				width : 10,
				height : 10,
			},
			position : {
				x : x,
				y : y
			},
			friction : 0.7,
			color : "red",
		});
		return player;
	}
	var initKeys = function(){
		inputManager = new InputManager({
            playerID : player.id,
        }, eventManager);
		inputManager.keyBinding(connector);
	}
	var initBackground = function(){
		var background = new StaticSquare({
			context : context,
			size : {
				width : 600,
				height : 400,
			},
			color : "black",
		}, eventManager);

		return background;
	};

	var getPlayers = function(){
		connector.socket.on("getPlayers", function(configs){
			for(var i in configs){
				connector.socket.emit("newPlayer", configs[i]);
			}
		});
		connector.socket.emit("getPlayers");
	}
	window.addEventListener("load", init);
})();