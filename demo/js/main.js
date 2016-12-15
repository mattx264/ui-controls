angular.module('app', ['ui.controls']).
    controller('demo', function ($scope) {
        $scope.date = {
            data: null,
            isRequired: true,
            ischeckfuturedate: true,
            isfifteenyearsvalidation: true
        };
        $scope.phone = {
            data: null,
            isRequired: true,
        };
        $scope.ssn = {
            data: null,
            isRequired: true,
        };

         $scope.mobileDDL = {
            id: 1,
            countries:[{id:1,name:'USA'},{id:2,name:'Poland'},{id:3,name:'Hungery'}]
        };
    });