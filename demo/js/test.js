angular.module('app', ['ui.controls']).
    controller('test', function ($scope,$rootScope,$compile) {
           var scope = $rootScope.$new();
         var element = $compile('<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>')(scope);
      //  scope.$digest();
        ctrl = $controller('UibAccordionController', { $scope: $scope, $attrs: $attrs });
      console.log(element);
        console.log(scope);
    });