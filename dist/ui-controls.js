
(function () {
    'use strict';
    angular.module('ui.controls',[]);
})();
(function () {
    'use strict';
    function dateInput($timeout) {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: { ngModel: '=', name: '@' },
            templateUrl: "src/dateInput/dateInput.html",

            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        scope.jumpToNextField = false;

                        scope.isSelected = false;
                        scope.Error = [];
                        scope.dateinput1 = scope.dateinput3 = scope.dateinput2 = "";
                        scope.idOfElement = Math.floor(Math.random() * 1000000);

                        iElement.attr("id", scope.idOfElement);
                        var reg = /[^0-9]/g;
                        var unbindWatcher = scope.$watch('ngModel', function (newVal) {
                            if (newVal != null) {
                                if (scope.ngModel != null) {
                                    var date = scope.ngModel.split('/');
                                    scope.dateinput1 = date[0];
                                    scope.dateinput2 = date[1];
                                    scope.dateinput3 = date[2];
                                }
                                unbindWatcher();//after init we dont need it
                            }
                        });
                        iElement.bind('keyup', function (event) {
                            if (event.keyCode === 9) {
                                if (scope.dateinput1.length == 1) {
                                    scope.$apply(function () {
                                        scope.dateinput1 = "0" + scope.dateinput1;
                                    });
                                }
                                if (scope.dateinput2.length == 1) {
                                    scope.$apply(function () {
                                        scope.dateinput2 = "0" + scope.dateinput2;
                                    });
                                }
                            }
                        });
                        scope.dateinput1Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .dateinput1').val();
                            }

                            scope.dateinput1 = text = text.replace(reg, '');

                            var textLength = text.length;
                            if (textLength == 2) {

                                $("#" + scope.idOfElement + " .dateinput2").select();
                            }
                            else if (textLength > 3) {
                                scope.dateinput1 = Number(scope.dateinput1.toString().substring(0, 2));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .dateinput2").select();
                            }
                            scope.updateModel();
                        }

                        scope.dateinput2Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .dateinput2').val();
                            }

                            scope.dateinput2 = text = text.replace(reg, '');

                            var textLength = text.length;
                            if (textLength == 2) {

                                $("#" + scope.idOfElement + " .dateinput3").select();
                            }
                            else if (textLength > 3) {
                                scope.dateinput2 = Number(scope.dateinput2.toString().substring(0, 2));
                                scope.updateModel();
                                $("#" + scope.idOfElement + " .dateinput3").select();
                            }
                            scope.updateModel();
                        }
                        scope.dateinput3Change = function (text) {

                            if (text == undefined) {
                                text = $('#' + scope.idOfElement + ' .dateinput3').val();
                            }
                            scope.dateinput3 = text = text.replace(reg, '');

                            var textLength = text.length;
                            if (textLength > 4) {
                                scope.dateinput3 = Number(scope.dateinput3.toString().substring(0, 4));
                                scope.updateModel();

                            }
                            scope.updateModel();
                        }


                        scope.updateModel = function () {

                            scope.ngModelDate = new Date(scope.dateinput3, scope.dateinput1 - 1, scope.dateinput2);
                            scope.ngModel = scope.dateinput1 + "/" + scope.dateinput2 + "/" + scope.dateinput3;
                        }
                        scope.validation = function () {
                            controller.$setValidity('invalid', true);
                            controller.$setValidity('required', true);
                            controller.$error = { "other": null };
                            if (scope.dateinput3 == null || scope.dateinput2 == null || scope.dateinput1 == null) {
                                controller.$setValidity('required', false);
                                return;
                            }
                            //added to check if either of the fields or all the fields has invalid dates
                            if ((scope.dateinput1 > 12 || scope.dateinput1 < 1) && (scope.dateinput2 > 31 || scope.dateinput2 < 1) && (scope.dateinput3.toString().length < 4 || scope.dateinput3 < 1900)) {
                                controller.$error = { "other": "Date is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if ((scope.dateinput1 > 12 || scope.dateinput1 < 1) && (scope.dateinput2 > 31 || scope.dateinput2 < 1)) {
                                controller.$error = { "other": "Month and Day is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if ((scope.dateinput3.toString().length < 4 || scope.dateinput3 < 1900) && (scope.dateinput2 > 31 || scope.dateinput2 < 1)) {
                                controller.$error = { "other": "Day and Year is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if ((scope.dateinput1 > 12 || scope.dateinput1 < 1) && (scope.dateinput3.toString().length < 4 || scope.dateinput3 < 1900)) {
                                controller.$error = { "other": "Month and Year is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            //code ends
                            if (scope.dateinput3.toString().length < 4) {
                                controller.$error = { "other": "Year is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.dateinput1 > 12 || scope.dateinput1 < 1) {
                                controller.$error = { "other": "Month is invalid (1-12)" };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.dateinput2 > 31 || scope.dateinput2 < 1) {
                                controller.$error = { "other": "Day is invalid (1-31)" };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (scope.dateinput3 < 1900) {
                                controller.$error = { "other": "Year is invalid." };
                                controller.$setValidity('invalid', false);
                                return;
                            }
                            if (iAttrs.checkfuturedate=="true") {
                                var currentDate = new Date();

                                if (currentDate < scope.ngModelDate) {
                                    if (currentDate.getFullYear() < scope.ngModelDate.getFullYear()) {
                                      //  controller.$error = { "futuredateValidation": "Year is invalid." };
                                       controller.$setValidity('futuredateValidation', false);
                                       return;
                                    }
                                    else if (currentDate.getMonth() < scope.ngModelDate.getMonth()) {
                                       // controller.$error = { "futuredateValidation": "Month is invalid." };
                                        controller.$setValidity('futuredateValidation', false);
                                        return;
                                    }
                                    else if (currentDate.getDate() < scope.ngModelDate.getDate()) {
                                       // controller.$error = { "futuredateValidation": "Day is invalid." };
                                        controller.$setValidity('futuredateValidation', false);
                                        return;
                                    }
                                    controller.$setValidity('futuredateValidation', true);
                                   
                                }
                            }
                            if (iAttrs.fifteenyearsvalidation=="true") {

                                var tempDate = new Date(scope.ngModelDate.getFullYear() + 16, scope.ngModelDate.getMonth(), scope.ngModelDate.getDate());
                                var todayDate = new Date();
                                if (tempDate > todayDate) {
                                    controller.$setValidity('fifteenyearsvalidationMessage', false);
                                    return;
                                }
                                controller.$setValidity('fifteenyearsvalidationMessage', true);
                            }


                            //controller.$error = null;
                        }
                        scope.$watch(function (scope) { return scope.focus }, function (newValue) {
                            if (newValue == true && scope.jumpToNextField == false) {
                                scope.isSelected = true;

                            } else if (newValue == false && scope.jumpToNextField == false) {
                                scope.isSelected = false;
                            }
                        });
                        scope.$watch(function (scope) { return scope.blur }, function (newValue) {
                            if (scope.jumpToNextField == true) {
                                scope.jumpToNextField = false;
                                return;
                            }
                            if (scope.dateinput1.length == 1) {
                                scope.dateinput1 = "0" + scope.dateinput1;
                                scope.updateModel();
                            }
                            if (scope.dateinput2.length == 1) {
                                scope.dateinput2 = "0" + scope.dateinput2;
                                scope.updateModel();
                            }
                            $timeout(function () {
                                if (newValue == true && scope.isSelected == false) {
                                    scope.isSelected = false;
                                    controller.$touched = true;
                                    if (iAttrs.required != null) {
                                        scope.validation();
                                    }
                                }
                            }, 100);
                        });


                        controller.$parsers.unshift(function (viewValue) {


                            scope.pwdLength = scope.date1.toString().length == 4 ? true : false
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
            }
        };
    };
    angular.module('ui.controls').directive('dateInput', ['$timeout', dateInput]);
})();
(function(){
    'use strict';
    function errorMessage() {
          return {
            restrict: 'E',
            transclude:true,
            template: '<div class="well well-sm ui-message-error">  <span class=""></span><div class="well-text" ng-transclude></div></div>',
        };
    }
    angular.module('ui.controls').directive('errorMessage', [errorMessage]);
})();
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
(function () {
    'use strict';
    function phoneInput($timeout) {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: { ngModel: '=' },
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