describe("Testing Require, Transclude and Replace", function () {
  var compile, scope, directiveElem;

  beforeEach(function () {
    module('ui.controls');
    module('src/test/basic/test.html');
    inject(function ($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();

    });

    directiveElem = getCompiledElement();

  });
  angular.module('ui.controls').directive('seventhDirective', function () {
    return {
      replace: true,
      template: '<div>Content in the directive</div>'
    };
  });
  angular.module('ui.controls').directive('eighthDirective', function () {
    return {
      transclude: true,
      template: '<div>Text in the directive.<div ng-transclude></div></div>'
    };
  });

  

  it('should fail if ngModel is not specified', function () {
    expect(function () {
      getCompiledElement('<input type="text" sixth-directive />');
    }).toThrow();
  });

  it('should work if ng-model is specified and not wrapped in form', function () {
    expect(function () {
      getCompiledElement('<div><input type="text" ng-model="name" sixth-directive /></div>');
    }).not.toThrow();
  });
  it('should have replaced directive element', function () {
    var compiledDirective = compile(angular.element('<div><seventh-directive></seventh-directive></div>'))(scope);
    scope.$digest();

    expect(compiledDirective.find('seventh-directive').length).toEqual(0);
  });
  //transclude
  it('should have an ng-transclude directive in it', function () {
    var transclude= getCompiledElement('<eighth-directive></eighth-directive>');
     console.log(transclude)
    var transcludeElem = transclude.find('div[ng-transclude=""]');
     console.log(transcludeElem.length)
   // expect(transcludeElem.length).toBe(1);
  });

  // it('should have transclude content', function () {
  //   expect(directiveElem.find('p').length).toEqual(1);
  // });
  it('should set form dirty', function () {
    var directiveElem = getCompiledElement('<form name="sampleForm"><input type="text" ng-model="name" sixth-directive /></form>');

    expect(scope.sampleForm.$dirty).toEqual(true);
  });
  function getCompiledElement(template) {
    var compiledDirective = compile(angular.element(template))(scope);
    scope.$digest();
    return compiledDirective;
  }
});