var workers = [];
var hireWorker = function(howMany){
  for(var i = 0; i < howMany; i++){
      var worker = new Worker('myWorker.js');

      worker.addEventListener('message', function(e) {
        var data = e.data;
        console.log(e.data);
      }, false);

      workers.push(worker);
  }
}
var makeWorking = function(){
  var c = document.getElementById("canvas");
  var co = c.getContext('2d');
  var data = co.getImageData(0,0, 100, 100);
  for(var i = 0; i < workers.length; i++){
    workers[i].postMessage(c);
  }
}