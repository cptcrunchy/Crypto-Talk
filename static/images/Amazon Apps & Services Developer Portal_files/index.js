(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var component = require("./directives/component");
var domRegion = require("./directives/dom-region");
angular.module('AWS-UI-Components', [domRegion.name, component.name]);
function registerComponent(componentName) {
    var componentDef = AwsUi.__componentDefinitions[componentName];
    component.defineComponent(componentName, componentDef);
}
exports.registerComponent = registerComponent;
function registerAllComponents() {
    for (var componentName in AwsUi.__componentDefinitions) {
        registerComponent(componentName);
    }
}
exports.registerAllComponents = registerAllComponents;

},{"./directives/component":2,"./directives/dom-region":3}],2:[function(require,module,exports){
"use strict";
var utils = require("../utils");
exports.name = 'components';
var module = angular.module(exports.name, []);
function toPropValue(component, propertyName, value) {
    var propertyDefinition = component.__propertiesDefinition[propertyName];
    return convertValueToPropertyType(value, propertyDefinition.type);
}
function convertValueToPropertyType(value, targetType) {
    switch (targetType) {
        case 'string':
            return (typeof value === 'undefined' || value === null) ? value : '' + value;
        case 'boolean':
            return Boolean(value);
    }
    return value;
}
function handleProperties(component, properties, attributes, scope) {
    utils.objectKeys(properties).forEach(function (attr) {
        if (!(attr in attributes))
            return;
        function setDefault() {
            component.__setFromString(attr, null);
        }
        function templateHandler(newVal) {
            if (newVal === '') {
                setDefault();
            }
            else {
                component[attr] = newVal;
            }
        }
        function handler(newVal) {
            var propValue = toPropValue(component, attr, newVal);
            if (angular.isDefined(propValue)) {
                component[attr] = propValue;
            }
            else {
                setDefault();
            }
        }
        var type = properties[attr].type || 'string';
        if (type === 'string' || type === 'region') {
            attributes.$observe(attr, templateHandler);
        }
        else {
            scope.$watch(attributes[attr], handler, ['object', 'array'].indexOf(type) >= 0);
        }
    });
}
function handleEvents(component, events, attributes, scope, element) {
    utils.objectKeys(events).forEach(function (eventName) {
        if (eventName in attributes) {
            element.on("awsui:" + eventName, function (event) {
                if (event.target === this) {
                    scope.$apply(function () {
                        scope.$eval(attributes[eventName], {
                            '$event': event,
                            'event': event,
                        });
                    });
                }
            });
        }
    });
}
function handleFunctions(component, functions, attributes, scope, $parse) {
    utils.objectKeys(functions).forEach(function (functionName) {
        var attribute = attributes[functionName + "Fn"];
        if (!attribute) {
            return;
        }
        var parsedFn = $parse(attributes[functionName + "Fn"]);
        if (parsedFn.assign) {
            var fn = function () { return component[functionName].apply(component, arguments); };
            parsedFn.assign(scope, fn);
        }
    });
}
function handleRegionsAsElements(transcludeFn, scope, component) {
    transcludeFn(scope, function (childNodes, childScope) {
        var looseNodes = [];
        var regionsDefined = false;
        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType == Node.TEXT_NODE && node.textContent.match(/^[ \t\n]+/m)) {
                continue;
            }
            if (node.getAttribute && node.getAttribute('dom-region')) {
                regionsDefined = true;
                continue;
            }
            looseNodes.push(node);
        }
        if (looseNodes.length === 0) {
            return;
        }
        if (regionsDefined) {
            for (var _i = 0, looseNodes_1 = looseNodes; _i < looseNodes_1.length; _i++) {
                var node_1 = looseNodes_1[_i];
                if (node_1.nodeType !== Node.COMMENT_NODE) {
                    throw new Error("Nodes outside a dom-region are not allowed when a dom-region has been explicitly defined");
                }
            }
            return;
        }
        var defaultRegion = angular.element('<span>');
        defaultRegion.append(looseNodes);
        component.setDefaultRegion(defaultRegion[0]);
    });
}
function addNgModelSupport(ngModelSupport, component, element, ngModelController, scope) {
    var propertyName = ngModelSupport.value;
    element.on('awsui:' + ngModelSupport.event, function (event) {
        if (event.target !== element[0]) {
            return;
        }
        scope.$apply(function () {
            return ngModelController.$setViewValue(component[propertyName], event);
        });
    });
    ngModelController.$render = function () {
        return component[ngModelSupport.value] = toPropValue(component, propertyName, ngModelController.$viewValue);
    };
    element.on('awsui:blur', function () { return scope.$evalAsync(ngModelController.$setTouched); });
}
function defineComponent(componentName, def) {
    module.directive(utils.toCamelCase(componentName), ['$parse', function ($parse) {
            var ngModelSupport = def.wrapperSupport && def.wrapperSupport.ngModel;
            return {
                restrict: 'E',
                transclude: true,
                require: ngModelSupport ? '?ngModel' : undefined,
                link: function (scope, $element, iAttrs, ngModelController, transcludeFn) {
                    $element.html('');
                    AwsUi.activate($element[0]);
                    var component = $element[0].component;
                    var childScope = scope.$new();
                    childScope.component = component;
                    handleProperties(component, def.properties, iAttrs, scope);
                    handleRegionsAsElements(transcludeFn, childScope, component);
                    handleFunctions(component, def.functions, iAttrs, scope, $parse);
                    if (ngModelSupport && ngModelController) {
                        addNgModelSupport(ngModelSupport, component, $element, ngModelController, scope);
                    }
                    $element.removeAttr('disabled');
                    handleEvents(component, def.events, iAttrs, scope, $element);
                    if (document.body.contains($element[0])) {
                        component.hasBeenAttached();
                    }
                    else {
                        console.error('Element was not in DOM when linked, cannot call hasBeenAttached() properly:', $element[0]);
                    }
                    $element.on('$destroy', function () {
                        component.hasBeenDetached();
                    });
                }
            };
        }]);
}
exports.defineComponent = defineComponent;

},{"../utils":4}],3:[function(require,module,exports){
"use strict";
exports.name = 'domRegion';
var module = angular.module(exports.name, []);
module.directive('domRegion', function () {
    return {
        restrict: 'A',
        link: {
            pre: function ($scope, $element, $attrs) {
                var component = $scope.component;
                component.setRegion($attrs.domRegion, $element[0]);
                $element.on('$destroy', function () {
                    component.removeRegion($attrs.domRegion);
                });
            }
        }
    };
});

},{}],4:[function(require,module,exports){
"use strict";
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
function toCamelCase(string) {
    return string.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}
exports.toCamelCase = toCamelCase;
function objectKeys(object) {
    return Object.keys(object || {});
}
exports.objectKeys = objectKeys;

},{}],5:[function(require,module,exports){
"use strict";
var angularComponents = require("./angular-components");
angularComponents.registerAllComponents();
AwsUi.__angular = angularComponents;

},{"./angular-components":1}]},{},[5]);
