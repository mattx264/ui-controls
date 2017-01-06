describe("Unit testing data input",function(){
     var $compile,
       $rootScope;
     beforeEach(module('ui.controls'));
     beforeEach(module('src/dateInput/dateInput.html'));
     beforeEach(inject(function(_$rootScope_) {
//     $rootScope = _$rootScope_;
//     //$scope = $rootScope.$new();
//     //ctrl = {};
//     //attrs = {};

//     //uibPaging.create(ctrl, $scope, attrs);
   }));
    it("Monthe",function(){
        expect(2).toBe(2);
    });
});