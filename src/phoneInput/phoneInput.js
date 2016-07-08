(function () {
    'use strict';
    function phoneInput($timeout) {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: { ngModel: '=', 'ngDisabled': '=', 'isEwc': '=' },
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        scope.jumpToNextField = false;
                        scope.isSelected = false;
                        scope.idOfElement = Math.floor(Math.random() * 1000000);
                        scope.phoneinput1 = scope.phoneinput2 = scope.phoneinput3 = "";
                        scope.stringNumber = ["", "", ""];
                        iElement.attr("id", scope.idOfElement);
                        var reg = /[^0-9]/g;
                        var unbindWatcher = scope.$watch('ngModel', function (newVal) {
                            if (newVal != null) {
                                var re = /[^0-9]/;
                                var justNumber = scope.ngModel.split(re).join('');
                                //scope.updateModel
                                scope.stringNumber[0] = scope.phoneinput1 = justNumber.substr(0, 3);
                                scope.stringNumber[1] = scope.phoneinput2 = justNumber.substr(3, 3);
                                scope.stringNumber[2] = scope.phoneinput3 = justNumber.substr(6, 4);
                                unbindWatcher();//after init we dont need it
                                scope.updateModel();
                                scope.validation();
                            }
                        });
                        scope.phoneinput1Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .phoneinput1').val();
                            }
                            scope.phoneinput1 = text = text.replace(reg, '');

                            var textLength = text.length;
                            if (textLength == 3) {
                                $("#" + scope.idOfElement + " .phoneinput2").select();
                            }
                            else if (textLength > 3) {
                                scope.phoneinput1 = text = scope.phoneinput1.toString().substring(0, 3);
                                $("#" + scope.idOfElement + " .phoneinput2").select();
                            }
                            if (scope.stringNumber[0] != text) {
                                scope.isEwc.isEwc = false;
                            }
                            scope.stringNumber[0] = text;
                            scope.updateModel();
                        }

                        scope.phoneinput2Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .phoneinput2').val();
                            }
                            scope.phoneinput2 = text = text.replace(reg, '');

                            var textLength = text.length;
                            if (textLength == 3) {
                                $("#" + scope.idOfElement + " .phoneinput3").select();
                            }
                            else if (textLength > 3) {
                                scope.phoneinput2 = text = scope.phoneinput2.toString().substring(0, 3);
                                $("#" + scope.idOfElement + " .phoneinput3").select();
                            }
                            if (scope.stringNumber[1] != text) {
                                scope.isEwc.isEwc = false;
                            }
                            scope.stringNumber[1] = text;
                            scope.updateModel();
                        }
                        scope.phoneinput3Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .phoneinput3').val();
                            }
                            scope.phoneinput3 = text = text.replace(reg, '');

                            var textLength = text.length;

                            if (textLength > 4) {
                                scope.phoneinput3 = text = scope.phoneinput3.substring(0, 4);
                                scope.stringNumber[2] = scope.phoneinput3.toString();
                            }
                           
                            if (scope.stringNumber[2] != text) {
                                scope.isEwc.isEwc = false;
                            }
                            scope.stringNumber[2] = text;
                            scope.updateModel();
                            if (textLength == 4) {//revalid
                                scope.validation();
                            }
                        }
                        scope.updateModel = function () {

                            scope.ngModel = scope.stringNumber[0] + "" + scope.stringNumber[1] + "" + scope.stringNumber[2];
                        }
                        scope.validation = function () {

                            if (scope.phoneinput3 == null || scope.phoneinput2 == null || scope.phoneinput1 == null) {
                                controller.$setValidity('required', false);
                                return;
                            }
                            if (scope.stringNumber[2].length < 4) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            else if (scope.stringNumber[1].length < 3) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            else if (scope.stringNumber[0].length < 3) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            controller.$setValidity('required', true);
                            controller.$setValidity('invalid', true);

                        }
                        scope.validationOnlyinvalid = function () {
                            if (scope.phoneinput3 == null || scope.phoneinput2 == null || scope.phoneinput1 == null) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.stringNumber[2].length < 4) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            else if (scope.stringNumber[1].length < 3) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            else if (scope.stringNumber[0].length < 3) {
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            controller.$setValidity('required', true);
                            controller.$setValidity('invalid', true);

                        }
                        scope.$watch(function (scope) { return scope.focus }, function (newValue) {
                            if (newValue == true && scope.jumpToNextField == false) {
                                scope.isSelected = true;

                            } else if (newValue == false && scope.jumpToNextField == false) {
                                scope.isSelected = false;
                            }
                        });
                        scope.$on('PHONE-CHECK-VALIDATION', function (event, args) {

                            controller.$setValidity('required', true);
                            controller.$setValidity('invalid', true);

                        });
                        scope.$watch(function (scope) { return scope.blur }, function (newValue) {
                            if (scope.jumpToNextField == true) {
                                scope.jumpToNextField = false;
                                return;
                            }
                            if (newValue == true && scope.isSelected == false) {
                                scope.isSelected = false;

                                controller.$touched = true;
                                if (iAttrs.required == true) {

                                  controller.$setValidity('required', true);
                                  scope.validation();

                                }
                                else if (scope.stringNumber[0].length > 0 || scope.stringNumber[1].length > 0 || scope.stringNumber[2].length > 0) {
                                    scope.validationOnlyinvalid();
                                }
                                else if (scope.stringNumber[0].length == 0 && scope.stringNumber[1].length == 0 && scope.stringNumber[2].length == 0) {
                                    controller.$setValidity('invalid', true);
                                }
                            }
                        });
                        controller.$parsers.unshift(function (viewValue) {
                            scope.pwdLength = scope.date1.toString().length == 4 ? true : false;
                            if (scope.pwdLengt == true) { // If all is good, then…
                                ctrcontrollerl.$setValidity('required', true); // Tell the controlller that the value is valid
                                return viewValue; // Return this value (it will be put into the model)
                            } else { // … otherwise…
                                controller.$setValidity('required', false); // Tell the controlller that the value is invalid
                                return undefined; // When the value is invalid, we should return `undefined`, as asked by the documentation
                            }

                        });
                    }
                }
            },
            templateUrl: "src/phoneInput/phoneInput.html",
        }
    }
    angular.module('ui.controls').directive('phoneInput', ['$timeout',  phoneInput])
})();