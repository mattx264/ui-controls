(function () {
    'use strict';
    function searchInput($http, $filter, $rootScope, $window, $document) {
        return {
            restrict: "E",
            templateUrl: 'sec/searchInput/searchInput.html',
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