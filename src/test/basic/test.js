angular.module('ui.controls', []).directive('firstDirective', function () {
    return {
        templateUrl: "src/test/basic/test.html",
        link: function (scope, elem) {
            scope.text = 'This span is appended from directive.';
            scope.$watch('text', function (newVal, oldVal) {
                scope.text = newVal;
            });
            // elem.find('button').on('click', function () {
            //     scope.value++;
            // });
            //OR
            scope.increaseValue = function () {
                scope.value++;
            }
        }
    }
});