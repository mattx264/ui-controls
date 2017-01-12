
angular.module('ui.controls').directive('fifthDirective', function () {
  return {
    scope: {
      config: '=',
      notify: '@',
      onChange: '&'
    }
   
  }
});