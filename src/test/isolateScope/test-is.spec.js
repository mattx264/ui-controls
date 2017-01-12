describe("TEST FOR ISOLATE SCOPE", function () {
    var isolatedScope, directiveElem;
    beforeEach(function () {
        module('ui.controls');
        inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
            scope.config = {
                prop: 'value'
            };
            scope.notify = true;
            scope.onChange = jasmine.createSpy('onChange');
        });
        directiveElem = getCompiledElement();
    });
    beforeEach(function () {
        isolatedScope = directiveElem.isolateScope();
    })
    it('config on isolated scope should be two-way bound', function () {
        isolatedScope.config.prop = "value 2";
        expect(scope.config.prop).toEqual(isolatedScope.config.prop);
    });
    it('notify on isolated scope should be one-way bound', function () {
        isolatedScope.notify = false;
        expect(scope.notify).toEqual(true);
    });
    it('onChange should be a function', function () {
        expect(typeof (isolatedScope.onChange)).toEqual('function');
    });
    it('should call onChange method of scope when invoked from isolated scope', function () {
        isolatedScope.onChange();

        expect(scope.onChange).toHaveBeenCalled();
    });
    function getCompiledElement(template) {
        if (template == null) {
            var compiledDirective = compile(angular.element('<fifth-directive config="config" notify="notify" on-change="onChange()"></fifth-directive>'))(scope);
            scope.$digest();
            return compiledDirective;
        } else if (template != null) {
            var compiledDirective = compile(angular.element(template))(scope);
            scope.$digest();
            return compiledDirective;
        }
    }

});