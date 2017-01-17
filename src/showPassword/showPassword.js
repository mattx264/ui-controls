(function () {
    'use strict';
    function showPassword() {
        return {
            scope: {passwordid:'='},
            link: function (scope, element, attrs, ctrl) {
                //init show password
               
                scope.passwordVisible = false;
                element.bind('click', function() {
                    if (scope.passwordVisible == false) {
                        $('#' + attrs.passwordid).removeAttr('type');
                        $('#' + attrs.passwordid).prop('type', 'text');
                        scope.passwordVisible = true;
                    } else {
                        $('#' + attrs.passwordid).removeAttr('type');
                        $('#' + attrs.passwordid).prop('type', 'password');
                        scope.passwordVisible = false;
                    }
                });

            }
        }
    }
    angular.module('ui.controls').directive('showPassword', [showPassword]);
})();