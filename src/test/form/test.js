angular.module('ui.controls').directive('sixthDirective', function () {
  return {
    require: ['ngModel', '^?form'],
    replace: true,
    template: '<div>Content in the directive</div>',
    link: function (scope, elem, attrs, ctrls) {
      if (ctrls[1]) {
        ctrls[1].$setDirty();
      }
    }
  };
});