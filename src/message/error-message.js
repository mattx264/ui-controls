(function(){
    'use strict';
    function errorMessage() {
          return {
            restrict: 'E',
            transclude:true,
            template: '<div class="well well-sm message-error">  <span class="icon icon-x-circle"></span><div class="well-text" ng-transclude></div></div>',
        };
    }
    angular.module('ui.controls').directive('errorMessage', [errorMessage]);
})();