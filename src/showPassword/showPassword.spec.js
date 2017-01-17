describe("Show Password test :", function () {
    var $compile,
        $rootScope, $scope;
    var isolatedScope, directiveElem;
    beforeEach(function () {
        module('ui.controls');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            $scope.mypassword = "mypassword";

        });
        directiveElem = getCompiledElement('<input type="checkbox" show-password passwordid="mypassword">');
        isolatedScope = directiveElem.isolateScope();
        // directiveElem = getCompiledElement('<fifth-directive config="config" notify="notify" on-change="onChange()"></fifth-directive>')
    });
    it("Build", function () {
        expect(isolatedScope.passwordVisible).toBe(false);
    });
    it("Click", function () {
        directiveElem.triggerHandler('click');
        $scope.$apply();
        //console.log($(directiveElem).attr("type"));
        expect(isolatedScope.passwordVisible).toBe(true);
    });
    function getCompiledElement(template) {

        var compiledDirective = $compile(angular.element(template))($scope);
        $rootScope.$digest();
        //console.log(compiledDirective);
        //console.log('Isolated scope:', compiledDirective.isolateScope().passwordVisible);
        return compiledDirective;

    }
})