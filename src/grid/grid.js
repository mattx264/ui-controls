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