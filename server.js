var express = require('express');
var app     = express();
var inputManager = require("./inputManager.js");
inputManager = new inputManager();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
io.set('log level', 0);


app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');


app.get('/test', function(req, res){
    res.send('Server is ok !');
});

app.get('/', function(req, res){
    res.render('home.jade');
});

var players = {};
var identifier = 1;
io.sockets.on('connection', function(socket) {
    
    socket.lastEmitTime = (new Date()).getTime();
    socket.on('coords', function(data){
        var t = (new Date()).getTime();
        if (t > socket.lastEmitTime + 30) {
            socket.lastEmitTime = t;
    		io.sockets.emit('coords', data);
        }
	});
	socket.on("newIdentifier", function(){
		//socket.emit("newIdentifier", identifier);
		socket.emit("newIdentifier", {identifier : identifier, nickName : pseudoGenerator()});
        inputManager.keys[identifier] = {};
		identifier++;
	});
	socket.on("newPlayer", function(config){
		if(!players[config.id])
			players[config.id] = config;

		io.sockets.emit("newPlayer", config);
	});
	socket.on("getPlayers", function(){
		socket.emit("getPlayers", players);
	})
	socket.on("triggerEvent", function(data){
		io.sockets.emit("triggerEvent", data);
	})
    socket.on("newPosition", function(data){
    	if(players[data.id]){
    		io.sockets.emit("newPosition", data);
    		players[data.id].position = data.position;
            players[data.id].collider = data.collider;
    	}
	});

    socket.on("keyPressed", function(datas){
        if(!inputManager.keys[datas.identifier])
            return;

        inputManager.keys[datas.identifier][datas.key] = true;
        io.sockets.emit("inputStatus", inputManager);
    });

    socket.on("keyUp", function(datas){
        if(!inputManager.keys[datas.identifier])
            return;

        inputManager.keys[datas.identifier][datas.key] = false;
        io.sockets.emit("inputStatus", inputManager);
    });
});

var pseudoList = [];
var pseudoGenerator = function (pseudoResult){

	this.pseudoResult = pseudoResult;
    var names = ["Turfu", "Colonel", "Pol", "Pom", "Moutarde", "Kiwi", "Frite", "FDP", "Megazord", "Poney", "Jojo", "Trucs", "Machin", "Sergent", "Mister", "Killer", "Soldat", "Wesh", "Yolo", "Tuc", "Turc", "Slam"];
    var randomness1 = parseInt(Math.random() * names.length);
    var randomness2 = parseInt(Math.random() * names.length);
    var randomness3 = parseInt(Math.random() * names.length);
    var wordsNumber = parseInt(Math.random() * 3);
    
    if (wordsNumber == 0)
    {
        this.pseudoResult = names[randomness1];
    }
    
    if (wordsNumber == 1)
    {
        this.pseudoResult = names[randomness1] + "-" + names[randomness2];
    }    

    if (wordsNumber == 2)
    {
        this.pseudoResult = names[randomness1] + "-" + names[randomness2] + "-" + names[randomness3];
    }

		if (pseudoList.indexOf(this.pseudoResult) > - 1)
		{
			pseudoGenerator();
		}
		else
		{
			pseudoList.push(this.pseudoResult);
		}
	
    console.log(pseudoList);
	return this.pseudoResult;
}

server.listen(8075);