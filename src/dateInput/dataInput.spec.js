describe("Unit testing data input", function () {
    var $compile,
        $rootScope, $scope;
    var isolatedScope, directiveElem;
    beforeEach(function () {
        module('ui.controls');
        module('src/dateInput/dateInput.html');
        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $scope.date = {
                //data: '2015/3/1',
                data: null,
                isRequired: true,
                ischeckfuturedate: true,
                isfifteenyearsvalidation: true
            };
        });
        directiveElem = getCompiledElement('<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>')
        // directiveElem = getCompiledElement('<fifth-directive config="config" notify="notify" on-change="onChange()"></fifth-directive>')
        isolatedScope = directiveElem.isolateScope();
    });
    it("Date Parsing ", function () {
        // // var element = $compile('<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>')($scope);
        // var input1 = directiveElem.find('input.dateinput1');
        // input1.triggerHandler("focus");
        // input1.val("1");
        // input1.triggerHandler('blur');
        // //          $(input1[0]).val("2");
        //  //       console.log( input1);
        // $scope.$digest();
        // $scope.$apply();
        // isolatedScope = directiveElem.isolateScope();
        // //         console.log(isolatedScope.dateinput1);
        // // console.log(isolatedScope.dateinput2);
        // // console.log(isolatedScope.dateinput3);
        // //         //console.log($scope.jumpToNextField);
        // console.log(isolatedScope.dateinput1);
        // //         expect(2).toBe(2);

        // var ngModelController = directiveElem.find('input').controller('ngModel');
        //   console.log(directiveElem.find('input'))
        // ngModelController.$setViewValue("20123");
        // // console.log(isolatedScope.dateinput1);
        // expect(isolatedScope.dateinput1).toBe('20');
        //    var ngModelController = directiveElem.find('input').controller('ngModel');
        //  ngModelController.$setViewValue("20123");

        var dirElementInput1 = directiveElem.find('input')[0];
        var dirElementInput2 = directiveElem.find('input')[1];
        var dirElementInput3 = directiveElem.find('input')[2];
        var ngModelController = directiveElem.find('input').controller('ngModel');
        //first
        angular.element(dirElementInput1).val('11111');
        angular.element(dirElementInput1).triggerHandler("change");
        expect(isolatedScope.dateinput1).toBe('11')
        //second
        angular.element(dirElementInput2).val('11111');
        angular.element(dirElementInput2).triggerHandler("change");
        expect(isolatedScope.dateinput2).toBe(11)
        //third
        angular.element(dirElementInput3).val('11111');
        angular.element(dirElementInput3).triggerHandler("change");
        expect(isolatedScope.dateinput3).toBe(1111);

    });
    it("Form ", function () {
        var formEleFaile = getCompiledElement('<form name="form">' +
            '<div>' +
            '<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>' +
            '</form>');
        var form = $scope.form;
        expect(form.$valid).toBe(false);
        formEleFaile.find('input').controller('ngModel');
        $scope.date.data = "2014/1/2";
        var formEle = getCompiledElement('<form name="form">' +
            '<div>' +
            '<date-input ng-model="date.data" name="Date" checkfuturedate="{{date.ischeckfuturedate}}" fifteenyearsvalidation="{{date.isfifteenyearsvalidation}}" ng-required="date.isRequired"></date-input>' +
            '</form>');
        formEle.find('input').controller('ngModel');
        form = $scope.form;

        var dirElementInput1 = formEle.find('input')[0];
        var dirElementInput2 = formEle.find('input')[1];
        var dirElementInput3 = formEle.find('input')[2];
        expect(isolatedScope.dateinput1).toBe("2014");
        expect(isolatedScope.dateinput2).toBe("1");
        expect(isolatedScope.dateinput3).toBe("2");
        expect(form.$valid).toBe(true);
    });
    function getCompiledElement(template) {
        var compiledDirective = $compile(angular.element(template))($scope);
        $scope.$digest();
        return compiledDirective;
    }
});
