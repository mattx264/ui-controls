
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
(function () {

    'use strict';

    function grid($filter) {
        return {
            templateUrl: 'src/grid/grid.html',
            scope: { 'selectedevent': "&", 'connectionEvent': '@', 'gridSetup': '=', 'addmanually': '&', 'hideaddmanually': '@' },
            controller: ['$scope', function ($scope) {
                $scope.pageList = [];
                $scope.dataList = [];
                $scope.resultView = false;
                $scope.preSearchText = "";
                $scope.presentSelectedHeader = null;
                $scope.currentPageSelected = 1;//init first page
                $scope.numberFrom = -1;
                $scope.numberItemStart = 0;//
                $scope.numberItemEnd = 10;//
                $scope.numberOfItemOnPage = 10; //default value is 10
                $scope.getPaggingList = function () {
                    if ($scope.dataList == null)
                        return;
                    if ($scope.numberOfItemOnPage == 'all') {
                        $scope.pageList = [{ number: 1, isSelected: true }];
                        $scope.checkFirstLastPage();
                        return;
                    }
                    var numberPage = Math.ceil(($scope.dataList.length / $scope.numberOfItemOnPage));

                    $scope.pageList = [];
                    for (var i = 0; i < numberPage; i++) {
                        $scope.pageList.push({ number: i + 1, isSelected: false });
                        if ($scope.currentPageSelected == (i + 1)) {
                            $scope.pageList[$scope.pageList.length - 1].isSelected = true;
                        }

                    }
                    if (numberPage < 8)
                        $scope.limitBegin = 0;
                    else {//function is for checking if bottom progress should be update
                        /////////////// TODO increase and decrease limit begin
                    }
                    $scope.checkFirstLastPage();
                }
                $scope.nextPage = function () {
                    if (($scope.numberItemStart + $scope.numberOfItemOnPage > $scope.dataList.length) || $scope.lastPage == true)
                        return;
                    $scope.numberItemStart += $scope.numberOfItemOnPage;
                    $scope.numberItemEnd += $scope.numberOfItemOnPage;
                    $scope.currentPageSelected++;
                    if ($scope.numberItemEnd > $scope.dataList.length)
                        $scope.numberItemEnd = $scope.dataList.length;
                    $scope.getPaggingList();
                }
                $scope.setPage = function (pageNumber) {

                    $scope.currentPageSelected = pageNumber;
                    $scope.numberItemStart = ($scope.numberOfItemOnPage * (pageNumber - 1));
                    $scope.numberItemEnd = ($scope.numberOfItemOnPage * pageNumber);
                    if ($scope.numberItemEnd > $scope.dataList.length)
                        $scope.numberItemEnd = $scope.dataList.length;
                    $scope.getPaggingList();
                }
                $scope.prePage = function () {
                    if (($scope.numberItemStart - $scope.numberOfItemOnPage < 0) || $scope.firstPage == true)
                        return;
                    $scope.numberItemStart -= $scope.numberOfItemOnPage;
                    $scope.numberItemEnd -= $scope.numberOfItemOnPage;
                    $scope.currentPageSelected--;
                    $scope.getPaggingList();
                    //check if this is last page

                }
                $scope.setNumberOfItemOnPage = function (val) {
                    if ($scope.numberOfItemOnPage == val)
                        return;
                    $scope.numberItemStart = 0;
                    $scope.currentPageSelected = 1;
                    if (val == 'all') {
                        $scope.numberItemEnd = $scope.dataList.length;

                    } else {
                        if ($scope.numberOfItemOnPage == 'all') {
                            $scope.numberItemEnd = val;

                        } else {
                            //  $scope.numberItemEnd -= $scope.numberOfItemOnPage; //reset to 0
                            //  $scope.numberItemEnd += val;
                            $scope.numberItemEnd = val;
                        }
                    }
                    if ($scope.numberItemEnd > $scope.dataList.length)
                        $scope.numberItemEnd = $scope.dataList.length;

                    $scope.numberOfItemOnPage = val;
                    $scope.getPaggingList();

                }

                $scope.checkFirstLastPage = function () {

                    if ($scope.numberOfItemOnPage == 'all' || $scope.dataList.length <= 10) {
                        $scope.firstPage = true;
                        $scope.lastPage = true;
                        return;
                    }
                    if ($scope.numberItemStart + $scope.numberOfItemOnPage > $scope.dataList.length) {
                        $scope.lastPage = true;
                    } else {
                        $scope.lastPage = false;
                    }
                    //check if this is first page
                    if ($scope.numberItemStart - $scope.numberOfItemOnPage < 0)
                        $scope.firstPage = true;
                    else {
                        $scope.firstPage = false;
                    }
                    $scope.normalizePageNumber();
                }
                $scope.normalizePageNumber = function () {
                    if ($scope.lastPage === false) {
                        //todo 
                    }
                }
            }],
            link: function (scope, element, attrs) {

                element.hide();
                scope.selectItem = function (id) {
                    if (scope.selectedevent != null) {
                        scope.selectedItem = $filter('getById')(scope.dataList, id);
                        scope.selectedevent({ result: scope.selectedItem });
                        element.hide();
                    }
                }

                scope.$on('CLEAR_FORM', function (e) {
                    scope.searchText = '';
                    element.hide();
                    scope.dataList = [];
                });
                scope.$on(scope.connectionEvent, function (e, data) {
                    if (data.searchText ==null || data.searchText == "") {
                        element.hide();
                        return;
                    }
                    scope.dataList = data.dataList;
                    scope.searchText = data.searchText;
                    element.show();
                    scope.getPaggingList();
                    scope.firstPage = true;
                    if(scope.dataList.length > 10)
                        scope.lastPage = false;
                    else
                        scope.lastPage = true;

                    scope.clickHeader({target:$('.grid-col-header').first()[0]}, scope.gridSetup.col[0]);
                });
                scope.clickHeader = function ($event, headObj) {
                    var sortBy = headObj.dataName;
                    if (scope.sortBy == sortBy || scope.sortBy == '-' + sortBy) {
                        if (scope.sortBy == '-' + sortBy) {
                            scope.sortBy = sortBy;
                            $($event.target).find('.icon').removeClass('icon-rotate-180');

                        } else {
                            scope.sortBy = '-' + sortBy;
                            $($event.target).find('.icon').addClass('icon-rotate-180');
                        }
                    } else {
                        if (scope.presentSelectedHeader != null) {
                            scope.presentSelectedHeader.selected = false;
                        }
                        scope.presentSelectedHeader = headObj;
                        scope.sortBy = sortBy;
                        headObj.selected = true;
                     
                        $('.active-col-header').removeClass('active-col-header');
                        $('.active-col-header').removeClass('icon-rotate-180');
                        $($event.target).addClass('active-col-header');
                    }
                }
             
            }
        }
    }
    angular.module('ui.controls').directive('grid', ['$filter', grid]);
})();
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

    function mobileDropdown($compile, $document, $parse, $window) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
        // 1: value expression (valueFn)
        // 2: label expression (displayFn)
        // 3: group by expression (groupByFn)
        // 4: disable when expression (disableWhenFn)
        // 5: array item variable name
        // 6: object item key variable name
        // 7: object item value variable name
        // 8: collection expression
        // 9: track by expression
        // jshint maxlen: 100

        function parseOptionsExpression(optionsExp, selectElement, scope) {

            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!(match)) {
                throw ngOptionsMinErr('iexp',
                    "Expected expression in form of " +
                    "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
                    " but got '{0}'. Element: {1}",
                    optionsExp, startingTag(selectElement));
            }

            // Extract the parts from the ngOptions expression

            // The variable name for the value of the item in the collection
            var valueName = match[5] || match[7];
            // The variable name for the key of the item in the collection
            var keyName = match[6];

            // An expression that generates the viewValue for an option if there is a label expression
            var selectAs = / as /.test(match[0]) && match[1];
            // An expression that is used to track the id of each object in the options collection
            var trackBy = match[9];
            // An expression that generates the viewValue for an option if there is no label expression
            var valueFn = $parse(match[2] ? match[1] : valueName);
            var selectAsFn = selectAs && $parse(selectAs);
            var viewValueFn = selectAsFn || valueFn;
            var trackByFn = trackBy && $parse(trackBy);

            // Get the value by which we are going to track the option
            // if we have a trackFn then use that (passing scope and locals)
            // otherwise just hash the given viewValue
            var getTrackByValueFn = trackBy ?
                function (value, locals) { return trackByFn(scope, locals); } :
                function getHashOfValue(value) {
                    // return hashKey(value);
                };
            var getTrackByValue = function (value, key) {
                return getTrackByValueFn(value, getLocals(value, key));
            };

            var displayFn = $parse(match[2] || match[1]);
            var groupByFn = $parse(match[3] || '');
            var disableWhenFn = $parse(match[4] || '');
            var valuesFn = $parse(match[8]);

            var locals = {};
            var getLocals = keyName ? function (value, key) {
                locals[keyName] = key;
                locals[valueName] = value;
                return locals;
            } : function (value) {
                locals[valueName] = value;
                return locals;
            };
            function Option(selectValue, viewValue, label, group, disabled) {
                this.selectValue = selectValue;
                this.viewValue = viewValue;
                this.label = label;
                this.group = group;
                this.disabled = disabled;
            }

            function getOptionValuesKeys(optionValues) {
                var optionValuesKeys;

                if (!keyName && Array.isArray(optionValues)) {
                    optionValuesKeys = optionValues;
                } else {
                    // if object, extract keys, in enumeration order, unsorted
                    optionValuesKeys = [];
                    for (var itemKey in optionValues) {
                        if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== '$') {
                            optionValuesKeys.push(itemKey);
                        }
                    }
                }
                return optionValuesKeys;
            }

            return {
                trackBy: trackBy,
                getTrackByValue: getTrackByValue,
                getWatchables: $parse(valuesFn, function (optionValues) {
                    // Create a collection of things that we would like to watch (watchedArray)
                    // so that they can all be watched using a single $watchCollection
                    // that only runs the handler once if anything changes
                    var watchedArray = [];
                    optionValues = optionValues || [];

                    var optionValuesKeys = getOptionValuesKeys(optionValues);
                    var optionValuesLength = optionValuesKeys.length;
                    for (var index = 0; index < optionValuesLength; index++) {
                        var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
                        var value = optionValues[key];

                        var locals = getLocals(value, key);
                        var selectValue = getTrackByValueFn(value, locals);
                        watchedArray.push(selectValue);

                        // Only need to watch the displayFn if there is a specific label expression
                        if (match[2] || match[1]) {
                            var label = displayFn(scope, locals);
                            watchedArray.push(label);
                        }

                        // Only need to watch the disableWhenFn if there is a specific disable expression
                        if (match[4]) {
                            var disableWhen = disableWhenFn(scope, locals);
                            watchedArray.push(disableWhen);
                        }
                    }
                    return watchedArray;
                }),

                getOptions: function () {

                    var optionItems = [];
                    var selectValueMap = {};

                    // The option values were already computed in the `getWatchables` fn,
                    // which must have been called to trigger `getOptions`
                    var optionValues = valuesFn(scope) || [];
                    var optionValuesKeys = getOptionValuesKeys(optionValues);
                    var optionValuesLength = optionValuesKeys.length;

                    for (var index = 0; index < optionValuesLength; index++) {
                        var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
                        var value = optionValues[key];
                        var locals = getLocals(value, key);
                        var viewValue = viewValueFn(scope, locals);
                        var selectValue = getTrackByValueFn(viewValue, locals);
                        var label = displayFn(scope, locals);
                        var group = groupByFn(scope, locals);
                        var disabled = disableWhenFn(scope, locals);
                        var optionItem = new Option(selectValue, viewValue, label, group, disabled);

                        optionItems.push(optionItem);
                        selectValueMap[selectValue] = optionItem;
                    }

                    return {
                        items: optionItems,
                        selectValueMap: selectValueMap,
                        getOptionFromViewValue: function (value) {
                            return selectValueMap[getTrackByValue(value)];
                        },
                        getViewValueFromOption: function (option) {
                            // If the viewValue could be an object that may be mutated by the application,
                            // we need to make a copy and not return the reference to the value on the option.
                            return trackBy ? angular.copy(option.viewValue) : option.viewValue;
                        }
                    };
                }
            };
        }


        var selectMask = window.document.createElement('div');
        selectMask.classList.add('select-mobile-mask');
        function ngOptionsPostLink(scope, selectElement, attr, ctrls) {
            var w = angular.element($window);
            scope.isInit = false;
            w.bind('resize', function () {
           
                if (window.innerWidth < 768)
                    init();
                else if (scope.isInit === true && window.innerWidth > 767) {
                    $document.find('.select-mobile-mask').remove();
                    scope.isInit = false;
                }

            });
            if (window.innerWidth > 767)
                return;

            function init() {
                if (scope.isInit === false) {
                    selectElement.parent().append(selectMask);
                    $(selectMask).click(function() {

                        var listScope = scope.$new();
                        listScope.selectList = ngOptions.getOptions();
                        listScope.selectList.selected = selectCtrl.readValue();
                        $document.find('body').eq(0).append($compile("<mobile-dropdown-list class='ui-mobile-list'></mobile-dropdown-list>")(listScope));
                        listScope.$on('$destroy', function(event) {
                            if (scope.nextSelected !== null) {
                                ngModelCtrl.$setViewValue(scope.nextSelected);
                                ngModelCtrl.$render();
                            }

                        });
                      
                    });
                    var selectCtrl = ctrls[0];

                    var ngModelCtrl = ctrls[1];


                    // The emptyOption allows the application developer to provide their own custom "empty"
                    // option when the viewValue does not match any of the option values.

                    var ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope);

                    scope.setSelected = function (value) {
                        scope.nextSelected = value;

                    }
                    scope.isInit = true;
                }
            }

            init();
           

        }

        return {
            restrict: 'A',
            terminal: true,
            require: ['select', 'ngModel'],
            link: {
                pre: function ngOptionsPreLink(scope, selectElement, attr, ctrls) {
                    // Deactivate the SelectController.register method to prevent
                    // option directives from accidentally registering themselves
                    // (and unwanted $destroy handlers etc.)
                    ctrls[0].registerOption = angular.noop;
                },
                post: ngOptionsPostLink
            }
        };
    }



    angular.module('ui.controls')
        .directive('mobileDropdown', ['$compile', '$document', '$parse', '$window', mobileDropdown]);

    function mobileDropdownList($document) {
        return {
            templateUrl: "src/mobileDropdown/mobileDropdown.html",
            link: function (scope, element, attr, ctrls) {
                element.addClass('ui-mobile-list-animation');
                $document.find('body').eq(0).addClass('modal-open');

                scope.back = function () {
                    scope.$parent.setSelected(null);
                    scope.$destroy();

                }
                scope.done = function () {
                    if (scope.selectList.selected == null) {
                        scope.showErrorMessage = true;
                    } else {
                        scope.$parent.setSelected(scope.selectList.selected);
                        scope.$destroy();
                    }
                }
                scope.changeSelect = function (value) {
                    scope.selectList.selected = value;
                }
                scope.$on('$destroy', function () {
                    $document.find('body').eq(0).removeClass('modal-open');
                    element.remove();
                });
            }
        }
    }
    angular.module('ui.controls')
       .directive('mobileDropdownList', ['$document', mobileDropdownList]);
})();



(function () {
    'use strict';
    function searchInput($http, $filter, $rootScope, $window, $document) {
        return {
            restrict: "E",
            templateUrl: 'src/searchInput/searchInput.html',
            scope: { 'selectedevent': "&", 'connectionEvent': '@', 'searchText': '=?', 'placeholder': '@', 'apiAddress': '@', 'display': "=", 'addmanually': '&', 'hideaddmanually': '@' },
            controller: ['$scope', function ($scope) {
                $scope.selectItem = function (id) {
                    if ($scope.selectedevent != null) {
                        $scope.selectedItem = $filter('getById')($scope.dataList, id);
                        $scope.selectedevent({ result: $scope.selectedItem });
                        $scope.resultView = false;
                    }
                }
                $scope.showAllData = function () {

                    var dataPackage = { dataList: $scope.dataList, searchText: $scope.searchText }
                    $rootScope.$broadcast($scope.connectionEvent, dataPackage);
                    if ($scope.resultView == true) {
                        $scope.resultView = false;
                    }
                }
            }],
            link: function (scope, element, attrs) {
                scope.resultView = false;
                scope.dataList = [];
                scope.preSearchText = "";
                scope.presentSelectedHeader = null;
                scope.numberOfPage = -1;
                scope.numberOfItemOnPage = 10; //default value is 10
                //init listeners
            var globalClickEvent = function (evt) {
                    if (element[0].contains(evt.target) == false) {
                        scope.$apply(function () {
                            scope.resultView = false;
                        });
                    }
                }

                $document.on('click', globalClickEvent);
                //end listeners
                scope.$on('$destroy', function () {
                    $document.off('click', globalClickEvent);
                });
                scope.clickHeader = function ($event, headObj) {
                    var sortBy = headObj.dataName;
                    if (scope.sortBy == sortBy || scope.sortBy == '-' + sortBy) {
                        if (scope.sortBy == '-' + sortBy) {
                            scope.sortBy = sortBy;
                            $($event.target).find('.icon').removeClass('icon-rotate-180');
                        } else {
                            scope.sortBy = '-' + sortBy;

                            $($event.target).find('.icon').addClass('icon-rotate-180');
                        }
                    } else {
                        if (scope.presentSelectedHeader != null) {
                            scope.presentSelectedHeader.selected = false;
                        }
                        scope.presentSelectedHeader = headObj;
                        scope.sortBy = sortBy;
                        headObj.selected = true;
                        $('.active-col-header').removeClass('active-col-header');
                        $('.active-col-header').removeClass('icon-rotate-180');
                        $($event.target).addClass('active-col-header');

                    }
                }
                scope.$on('CLEAR_FORM', function (e) {
                    scope.searchText = "";
                    scope.resultView = false;
                    scope.dataList = [];
                });
                $(element).find('.result').width($('.main-part').width() - 1);//set width of 
                scope.clearSearchField = function () {
                    scope.searchText = "";
                };
                element.bind("keyup", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.showAllData();
                        });
                        event.preventDefault();
                    } else if (event.which == 27) {
                        scope.$apply(function() {
                            scope.resultView = false;
                        });
                    }
                });
                scope.$watch('searchText', function (newVal) {
                    if (newVal != null) {
                        if (newVal.length == 0) {
                            scope.resultView = false;
                            scope.dataList = [];
                        } else {

                            if (newVal != scope.preSearchText) {
                                $http.get(scope.apiAddress, { params: { searchtext: newVal } }).then(function (data) {
                                    if (data.data.highSchool != null)
                                        scope.dataList = data.data.highSchool;
                                    else if (data.data.colleges != null)
                                        scope.dataList = data.data.colleges;
                                    else {
                                        scope.dataList = data.data.agencies;
                                    }
                                    scope.numberOfPage = Math.ceil(scope.dataList.length / scope.numberOfItemOnPage);
                                    if ($window.innerWidth > 767) {
                                        $(element).find('.result').width($(element).find('.main-part').width() - 1);//set width of 
                                    }
                                    else {
                                        (element).find('.result').width('100%');
                                    }
                                    scope.resultView = true;  // for showing table
                                }, function () {

                                });
                            }


                        }
                    }
                });
            }
        }
    }
    angular.module('ui.controls').directive('searchInput', ['$http', '$filter', '$rootScope', '$window', '$document', searchInput]);
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