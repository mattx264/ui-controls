(function () {
    'use strict';

    function mobileDropdown($compile, $document, $parse, $window) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
        // 1: value expression (valueFn)
        // 2: label expression (displayFn)
        // 3: group by expression (groupByFn)
        // 4: disable when expression (disableWhenFn)
        // 5: array item variable name
        // 6: object item key variable name
        // 7: object item value variable name
        // 8: collection expression
        // 9: track by expression
        // jshint maxlen: 100

        function parseOptionsExpression(optionsExp, selectElement, scope) {

            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!(match)) {
                throw ngOptionsMinErr('iexp',
                    "Expected expression in form of " +
                    "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
                    " but got '{0}'. Element: {1}",
                    optionsExp, startingTag(selectElement));
            }

            // Extract the parts from the ngOptions expression

            // The variable name for the value of the item in the collection
            var valueName = match[5] || match[7];
            // The variable name for the key of the item in the collection
            var keyName = match[6];

            // An expression that generates the viewValue for an option if there is a label expression
            var selectAs = / as /.test(match[0]) && match[1];
            // An expression that is used to track the id of each object in the options collection
            var trackBy = match[9];
            // An expression that generates the viewValue for an option if there is no label expression
            var valueFn = $parse(match[2] ? match[1] : valueName);
            var selectAsFn = selectAs && $parse(selectAs);
            var viewValueFn = selectAsFn || valueFn;
            var trackByFn = trackBy && $parse(trackBy);

            // Get the value by which we are going to track the option
            // if we have a trackFn then use that (passing scope and locals)
            // otherwise just hash the given viewValue
            var getTrackByValueFn = trackBy ?
                function (value, locals) { return trackByFn(scope, locals); } :
                function getHashOfValue(value) {
                    // return hashKey(value);
                };
            var getTrackByValue = function (value, key) {
                return getTrackByValueFn(value, getLocals(value, key));
            };

            var displayFn = $parse(match[2] || match[1]);
            var groupByFn = $parse(match[3] || '');
            var disableWhenFn = $parse(match[4] || '');
            var valuesFn = $parse(match[8]);

            var locals = {};
            var getLocals = keyName ? function (value, key) {
                locals[keyName] = key;
                locals[valueName] = value;
                return locals;
            } : function (value) {
                locals[valueName] = value;
                return locals;
            };
            function Option(selectValue, viewValue, label, group, disabled) {
                this.selectValue = selectValue;
                this.viewValue = viewValue;
                this.label = label;
                this.group = group;
                this.disabled = disabled;
            }

            function getOptionValuesKeys(optionValues) {
                var optionValuesKeys;

                if (!keyName && Array.isArray(optionValues)) {
                    optionValuesKeys = optionValues;
                } else {
                    // if object, extract keys, in enumeration order, unsorted
                    optionValuesKeys = [];
                    for (var itemKey in optionValues) {
                        if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== '$') {
                            optionValuesKeys.push(itemKey);
                        }
                    }
                }
                return optionValuesKeys;
            }

            return {
                trackBy: trackBy,
                getTrackByValue: getTrackByValue,
                getWatchables: $parse(valuesFn, function (optionValues) {
                    // Create a collection of things that we would like to watch (watchedArray)
                    // so that they can all be watched using a single $watchCollection
                    // that only runs the handler once if anything changes
                    var watchedArray = [];
                    optionValues = optionValues || [];

                    var optionValuesKeys = getOptionValuesKeys(optionValues);
                    var optionValuesLength = optionValuesKeys.length;
                    for (var index = 0; index < optionValuesLength; index++) {
                        var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
                        var value = optionValues[key];

                        var locals = getLocals(value, key);
                        var selectValue = getTrackByValueFn(value, locals);
                        watchedArray.push(selectValue);

                        // Only need to watch the displayFn if there is a specific label expression
                        if (match[2] || match[1]) {
                            var label = displayFn(scope, locals);
                            watchedArray.push(label);
                        }

                        // Only need to watch the disableWhenFn if there is a specific disable expression
                        if (match[4]) {
                            var disableWhen = disableWhenFn(scope, locals);
                            watchedArray.push(disableWhen);
                        }
                    }
                    return watchedArray;
                }),

                getOptions: function () {

                    var optionItems = [];
                    var selectValueMap = {};

                    // The option values were already computed in the `getWatchables` fn,
                    // which must have been called to trigger `getOptions`
                    var optionValues = valuesFn(scope) || [];
                    var optionValuesKeys = getOptionValuesKeys(optionValues);
                    var optionValuesLength = optionValuesKeys.length;

                    for (var index = 0; index < optionValuesLength; index++) {
                        var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
                        var value = optionValues[key];
                        var locals = getLocals(value, key);
                        var viewValue = viewValueFn(scope, locals);
                        var selectValue = getTrackByValueFn(viewValue, locals);
                        var label = displayFn(scope, locals);
                        var group = groupByFn(scope, locals);
                        var disabled = disableWhenFn(scope, locals);
                        var optionItem = new Option(selectValue, viewValue, label, group, disabled);

                        optionItems.push(optionItem);
                        selectValueMap[selectValue] = optionItem;
                    }

                    return {
                        items: optionItems,
                        selectValueMap: selectValueMap,
                        getOptionFromViewValue: function (value) {
                            return selectValueMap[getTrackByValue(value)];
                        },
                        getViewValueFromOption: function (option) {
                            // If the viewValue could be an object that may be mutated by the application,
                            // we need to make a copy and not return the reference to the value on the option.
                            return trackBy ? angular.copy(option.viewValue) : option.viewValue;
                        }
                    };
                }
            };
        }


        var selectMask = window.document.createElement('div');
        selectMask.classList.add('select-mobile-mask');
        function ngOptionsPostLink(scope, selectElement, attr, ctrls) {
            var w = angular.element($window);
            scope.isInit = false;
            w.bind('resize', function () {
           
                if (window.innerWidth < 768)
                    init();
                else if (scope.isInit === true && window.innerWidth > 767) {
                    $document.find('.select-mobile-mask').remove();
                    scope.isInit = false;
                }

            });
            if (window.innerWidth > 767)
                return;

            function init() {
                if (scope.isInit === false) {
                    selectElement.parent().append(selectMask);
                    $(selectMask).click(function() {

                        var listScope = scope.$new();
                        listScope.selectList = ngOptions.getOptions();
                        listScope.selectList.selected = selectCtrl.readValue();
                        $document.find('body').eq(0).append($compile("<mobile-dropdown-list class='ui-mobile-list'></mobile-dropdown-list>")(listScope));
                        listScope.$on('$destroy', function(event) {
                            if (scope.nextSelected !== null) {
                                ngModelCtrl.$setViewValue(scope.nextSelected);
                                ngModelCtrl.$render();
                            }

                        });
                      
                    });
                    var selectCtrl = ctrls[0];

                    var ngModelCtrl = ctrls[1];


                    // The emptyOption allows the application developer to provide their own custom "empty"
                    // option when the viewValue does not match any of the option values.

                    var ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope);

                    scope.setSelected = function (value) {
                        scope.nextSelected = value;

                    }
                    scope.isInit = true;
                }
            }

            init();
           

        }

        return {
            restrict: 'A',
            terminal: true,
            require: ['select', 'ngModel'],
            link: {
                pre: function ngOptionsPreLink(scope, selectElement, attr, ctrls) {
                    // Deactivate the SelectController.register method to prevent
                    // option directives from accidentally registering themselves
                    // (and unwanted $destroy handlers etc.)
                    ctrls[0].registerOption = angular.noop;
                },
                post: ngOptionsPostLink
            }
        };
    }



    angular.module('ui.controls')
        .directive('mobileDropdown', ['$compile', '$document', '$parse', '$window', mobileDropdown]);

    function mobileDropdownList($document) {
        return {
            templateUrl: "src/mobileDropdown/mobileDropdown.html",
            link: function (scope, element, attr, ctrls) {
                element.addClass('ui-mobile-list-animation');
                $document.find('body').eq(0).addClass('modal-open');

                scope.back = function () {
                    scope.$parent.setSelected(null);
                    scope.$destroy();

                }
                scope.done = function () {
                    if (scope.selectList.selected == null) {
                        scope.showErrorMessage = true;
                    } else {
                        scope.$parent.setSelected(scope.selectList.selected);
                        scope.$destroy();
                    }
                }
                scope.changeSelect = function (value) {
                    scope.selectList.selected = value;
                }
                scope.$on('$destroy', function () {
                    $document.find('body').eq(0).removeClass('modal-open');
                    element.remove();
                });
            }
        }
    }
    angular.module('ui.controls')
       .directive('mobileDropdownList', ['$document', mobileDropdownList]);
})();


