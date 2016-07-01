(function () {
    'use strict';
    function ssnInput($compile) {
        return {
         
            require: 'ngModel',
            scope: { ngModel: '=' },
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) { },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        scope.idOfElement = Math.floor(Math.random() * 1000000);
                        scope.isSelected = false;
                        scope.cecssninput1 = scope.cecssninput2 =scope.cecssninput3= "";
                        var reg=/[^0-9]/g;
                        iElement.attr("id", scope.idOfElement);
                        scope.$watch('ngModel', function (newVal) {
                            if (newVal != null) {
                              
                            }else if (newVal == null) {
                                if (scope.ngModel == null) {
                                    scope.cecssninput1 = scope.cecssninput2 = scope.cecssninput3 = "";
                                }
                            }
                        });
                        scope.cecssninput1Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .cecssninput1').val();
                            }
                            scope.cecssninput1 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length;
                            if (textLength == 3) {
                               
                                $("#" + scope.idOfElement + " .cecssninput2").select();
                            }
                            else if (textLength > 3) {
                                scope.cecssninput1 = Number(scope.cecssninput1.toString().substring(0, 3));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .cecssninput2").select();
                            }
                        }
                        scope.cecssninput2Change = function (text) {
                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .cecssninput2').val();
                            }
                            scope.cecssninput2 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length
                            if (textLength == 2) {
                                
                                $("#" + scope.idOfElement + " .cecssninput3").select();
                            }
                            else if (textLength > 2) {
                                scope.cecssninput2 = Number(scope.cecssninput2.toString().substring(0, 2));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .cecssninput3").select();
                            }
                        }
                        scope.cecssninput3Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .cecssninput3').val();
                            }
                            scope.cecssninput3 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length
                            if (textLength > 4) {
                                scope.cecssninput3 = Number(scope.cecssninput3.toString().substring(0, 4));
                                scope.updateModel();

                            }
                        }
                        scope.updateModel = function () {
                            scope.ngModel = scope.cecssninput1+"-"+scope.cecssninput2+"-"+scope.cecssninput3
                        }
                        scope.$watch(function (scope) { return scope.focus }, function (newValue) {
                            if (newValue == true && scope.jumpToNextField == false) {
                                scope.isSelected = true;

                            } else if (newValue == false && scope.jumpToNextField == false) {
                                scope.isSelected = false;
                            }
                        });
                        scope.validation = function () {
                            controller.$setValidity('invalid', true);
                            controller.$setValidity('required', true);
                            if (scope.cecssninput3 == null || scope.cecssninput2 == null || scope.cecssninput1 == null) {
                                controller.$setValidity('required', false);
                                return;
                            }
                            if (scope.cecssninput3.toString().length < 4) {
                              
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.cecssninput1.toString().length > 3 || scope.cecssninput1.toString().length < 1) {
                              
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.cecssninput2.toString().length > 2 || scope.cecssninput2.toString().length < 1) {
                             
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            
                        }
                        scope.$watch(function (scope) { return scope.blur }, function (newValue) {
                            if (scope.jumpToNextField == true) {
                                scope.jumpToNextField = false;
                                return;
                            }
                            if (newValue == true && scope.isSelected == false) {
                                scope.isSelected = false;
                                controller.$touched = true;
                                if (iAttrs.required != null) {
                                    scope.validation();
                                }
                            }
                        });
                    }
                }

            },
            templateUrl: "src/ssnInput/ssnInput.html",
        }
    }

    angular.module('ui.controls').directive('ssnInput', ['$compile',ssnInput]);
})();