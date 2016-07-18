angular.module('app', ['ui.controls']).
    controller('demo', function ($scope) {
        $scope.date={
            data:null,
            isRequired:true,
            ischeckfuturedate:true,
            isfifteenyearsvalidation:true
        };
        $scope.phone={
            data:null,
            isRequired:true,
        }
    });