(function(){
'use strict';
   angular.module('funApp.controllers', [])
      .controller('mainController', [ '$modal',
         function($modal){
            // --- conect the controller with the view
            var vm = this;

            vm.str = '';

            // --- display added phrases ---
            vm.activePhrases = [
               {
                  type: 'success',
                  msg: 'Chuta que estay pesao po!'
               }
            ];

            vm.dismissPhrase = function(index) {
               vm.activePhrases.splice(index, 1);
            };

            vm.newPhrase = function( isValid, content, type) {
               if (isValid) {
                  vm.activePhrases.push({type: type, msg: content});
                  vm.str = null;
            };
            };


            // --- modal open function ---
            vm.openModal = function(){
               var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'modal.html',
                  controller: 'ModalController',
                  controllerAs: 'vm',
               });
            };

         }])

      // --- modal controller
      .controller('ModalController', ['$modalInstance',
         function($modalInstance){

            var vm = this;

            vm.ok = function() {
               $modalInstance.close(true);
            };

         }]);
})();