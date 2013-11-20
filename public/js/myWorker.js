self.computeArray = function(array){
   for (var i = 0; i < 100000000; i++){
      array.push(i);
   }

   return array;
}

self.addEventListener('message', function(e) {
    self.postMessage(e.data);
}, false);