describe("Unit testing data input", function () {
    var $compile,
        $rootScope, $scope;
    beforeEach(module('ui.controls'));
    //beforeEach(module('src/dateInput/dateInput.html'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        //     //ctrl = {};
        //     //attrs = {};

        //     //uibPaging.create(ctrl, $scope, attrs);
    }));
    // it("Build ",function(){

    //     var element = $compile('<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>')($scope);
    //     $rootScope.$digest();
    //     console.log(element.html());
    //      console.log($scope.jumpToNextField);
    //    it("Monthe",function(){
    //     expect(2).toBe(2);
    // });
    // });
    describe('controller', function () {
        var ctrl, $element, $attrs;
        beforeEach(inject(function ($controller) {
            $attrs = {};
            ctrl = $controller('UibAccordionController', { $scope: $scope, $attrs: $attrs });
        }));
    });
});