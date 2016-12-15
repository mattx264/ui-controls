(function(){
    'use strict';
    function errorMessage() {
          return {
            restrict: 'E',
            transclude:true,
            template: '<div class="well well-sm ui-message-error">  <span class=""></span><div class="well-text" ng-transclude></div></div>',
        };
    }
    angular.module('ui.controls').directive('errorMessage', [errorMessage]);
})();