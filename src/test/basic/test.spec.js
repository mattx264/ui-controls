
/*****************    TEST FOR !NO! ISOLATE SCOPE */
describe("TEST FOR !NO! ISOLATE SCOPE", function () {
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
  it('should have span element', function () {
    var spanElement = directiveElem.find('span');

    expect(spanElement).toBeDefined();
    expect(spanElement.text()).toEqual('This span is appended from directive.');
  });

  //test watch
  it('should have updated text in span', function () {

    scope.text = 'some other text';
    scope.$digest();

    var spanElement = directiveElem.find('span');
   // console.log(spanElement.text())
    expect(spanElement).toBeDefined();
    expect(spanElement.text()).toEqual(scope.text);
  });
  //test click - event
  it('should increment value on click of button', function () {
    scope.value = 10;
    var button = directiveElem.find('button');

    button.triggerHandler('click');
    scope.$digest();

    expect(scope.value).toEqual(11);
  });
  it('should increment value on click of button', function () {
    scope.value = 10;
    var button = directiveElem.find('button');
    button.triggerHandler('click');
    scope.$digest();
    expect(scope.value).toEqual(11);
  });

  function getCompiledElement() {
    var element = angular.element('<div first-directive></div>');

    var compiledElement = compile(element)(scope);
    scope.$digest();

    return compiledElement;
  }
});