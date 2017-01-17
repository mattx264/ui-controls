// describe("Unit testing grid", function () {
//     var $compile,
//         $rootScope, $scope;
//     var isolatedScope, directiveElem;
//     beforeEach(function () {
//         module('ui.controls');
//         module('src/grid/grid.html');
//         inject(function (_$compile, _$rootScope) {
//             $compile = _$compile_;
//             $rootScope = _$rootScope_;
//             $scope = $rootScope.$new();
//         })
//         directiveElem = getCompiledElement('<grid></grid>')

//     })
//     it("Monthe", function () {
//         expect(2).toBe(2);
//     });
//      function getCompiledElement(template) {
//         var compiledDirective = $compile(angular.element(template))($scope);
//         $scope.$digest();
//         return compiledDirective;
//     }
// });