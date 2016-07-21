(function () {
    'use strict';
    function showPassword() {
        return {
            scope: {},
            link: function (scope, element, attrs, ctrl) {
                //init show password
                var passwordVisible = false;
                element.bind('click', function() {
                    if (passwordVisible == false) {
                        $('#' + attrs.passwordid).removeAttr('type');
                        $('#' + attrs.passwordid).prop('type', 'text');
                        passwordVisible = true;
                    } else {
                        $('#' + attrs.passwordid).removeAttr('type');
                        $('#' + attrs.passwordid).prop('type', 'password');
                        passwordVisible = false;
                    }
                });

            }
        }
    }
    angular.module('ui.controls').directive('showPassword', [showPassword]);
})();