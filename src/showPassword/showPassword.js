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
                        $('#' + attrs.cecpasswordid).removeAttr('type');
                        $('#' + attrs.cecpasswordid).prop('type', 'text');
                        passwordVisible = true;
                    } else {
                        $('#' + attrs.cecpasswordid).removeAttr('type');
                        $('#' + attrs.cecpasswordid).prop('type', 'password');
                        passwordVisible = false;
                    }
                });

            }
        }
    }
    angular.module('ui.controls').directive('showPassword', [cecShowPassword]);
})();