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
                        scope.ssninput1 = scope.ssninput2 =scope.ssninput3= "";
                        var reg=/[^0-9]/g;
                        iElement.attr("id", scope.idOfElement);
                        scope.$watch('ngModel', function (newVal) {
                            if (newVal != null) {
                              
                            }else if (newVal == null) {
                                if (scope.ngModel == null) {
                                    scope.ssninput1 = scope.ssninput2 = scope.ssninput3 = "";
                                }
                            }
                        });
                        scope.ssninput1Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .ssninput1').val();
                            }
                            scope.ssninput1 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length;
                            if (textLength == 3) {
                               
                                $("#" + scope.idOfElement + " .ssninput2").select();
                            }
                            else if (textLength > 3) {
                                scope.ssninput1 = Number(scope.ssninput1.toString().substring(0, 3));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .ssninput2").select();
                            }
                        }
                        scope.ssninput2Change = function (text) {
                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .ssninput2').val();
                            }
                            scope.ssninput2 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length
                            if (textLength == 2) {
                                
                                $("#" + scope.idOfElement + " .ssninput3").select();
                            }
                            else if (textLength > 2) {
                                scope.ssninput2 = Number(scope.ssninput2.toString().substring(0, 2));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .ssninput3").select();
                            }
                        }
                        scope.ssninput3Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .ssninput3').val();
                            }
                            scope.ssninput3 = text = text.replace(reg, '');
                            scope.updateModel();
                            var textLength = text.length
                            if (textLength > 4) {
                                scope.ssninput3 = Number(scope.ssninput3.toString().substring(0, 4));
                                scope.updateModel();

                            }
                        }
                        scope.updateModel = function () {
                            scope.ngModel = scope.ssninput1+"-"+scope.ssninput2+"-"+scope.ssninput3
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
                            if (scope.ssninput3 == null || scope.ssninput2 == null || scope.ssninput1 == null) {
                                controller.$setValidity('required', false);
                                return;
                            }
                            if (scope.ssninput3.toString().length < 4) {
                              
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.ssninput1.toString().length > 3 || scope.ssninput1.toString().length < 1) {
                              
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.ssninput2.toString().length > 2 || scope.ssninput2.toString().length < 1) {
                             
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