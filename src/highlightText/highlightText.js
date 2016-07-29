(function () {
    'use strict';

    function highlightText() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            
            scope: { searchText: '=',ngBind:'=' },
            link: function (scope, element, attrs,ngBind) {
               
                scope.$watch('searchText', function (neww, old) {
                    if (neww != null && scope.ngBind != null) {
                        var regex = new RegExp(scope.searchText.toLowerCase(), 'i');
                        var index = scope.ngBind.toLowerCase().indexOf(scope.searchText);
                        if (index == -1)
                            return element;
                        var result = scope.ngBind.replace(regex, '<strong>' + scope.ngBind.substr(index, scope.searchText.length) + '</strong>'); //
                        element.html('');
                        return element.append(result);
                    };
                    return null;
                }, true);
              
            }
        }
    }

    angular.module('ui.controls').directive('highlightText', [highlightText]);
})();