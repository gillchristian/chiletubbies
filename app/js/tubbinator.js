(function(){
   'use strict';

   angular.module('funApp.filters', [])
      .filter('tubbinate', [
         function(){
            
            function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            }

            return function(string){
               var names = ['Tinky-Winky', 'Dipsy', 'Laa-Laa', 'Po'];
               var parts = [];
               parts = string.split(' ');


               parts.forEach(function(currentValue, index){
                  var i = getRandomInt(0, names.length);
                  parts[index] = currentValue.replace( /(\bpo\b)|(\bpoh\b)/ig, names[i] );
               });

               return parts.join(' ');
            }
         }]);

})();