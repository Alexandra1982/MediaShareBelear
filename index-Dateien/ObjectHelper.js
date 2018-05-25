/**
 * @class webmodules.helpers.ObjectHelper
 * @alternateClassName ObjectHelper
 *
 * @alias object-helper
 *
 * # Summary
 *
 * ** Provides a set of helper functions to deal with Objects **
 *
 * This {@link ObjectHelper} fills only the gap of missing and/or maverick helper functions.
 * For all *default* functionality to deal with Objects (Arrays, Collections, and Functions as well)
 * use [lodash], a utility library delivering consistency, customization, performance, & extras.
 *
 * ## Examples
 *
 * ** Get a property from an object using dot-notation **
 *
 *     @example
 *     require(['object-helper'], function(ObjectHelper){
 *       //var ObjectHelper = require('object-helper');
 *
 *       var obj = {a: { b: { c: 'hello'}}};
 *       var c = ObjectHelper.getProp('a.b.c', obj);
 *       Docs.log(c); //> 'hello'
 *     });
 *
 * ** Set a property to an object using dot-notation **
 *
 *     @example
 *     require(['object-helper'], function(ObjectHelper){
 *       //var ObjectHelper = require('object-helper');
 *
 *       var obj = ObjectHelper.setProp({}, 'a.b.c', 'hello');
 *       Docs.log(obj); //> {a: { b: { c: 'hello'}}};
 *     });
 *
 * ** Set a property to an object using array-notation **
 *
 *     @example
 *     require(['object-helper'], function(ObjectHelper){
 *       //var ObjectHelper = require('object-helper');
 *
 *       var obj = ObjectHelper.setProp({}, ['a', 'b', 'c'], 'hello');
 *       Docs.log(obj); //> {a: { b: { c: 'hello'}}};
 *     });
 *
 * ** Get the size of an object (using lodash) **
 *
 *     @example
 *     require(['lodash'], function(_){
 *       //var _ = require('lodash');
 *
 *       var obj = {a: 1, b: 2, c: 3};
 *       var size = _.size(obj);
 *       Docs.log(size);
 *     });
 *
 * ** Define a property on an object (useful for complex objects with dynamic property keys) **
 *
 *     @example
 *     require(['object-helper'], function(ObjectHelper) {
 *       //var ObjectHelper = require('object-helper');
 *
 *       var data = ObjectHelper.defineProp({}, 'today', ObjectHelper.defineProp({}, 'time', +new Date));
 *       Docs.log(data);
 *
 *       // Instead of:
 *       data = {};
 *       data['today'] = {};
 *       data['today']['time'] = +new Date;
 *       Docs.log(data);
 *     });
 *
 * [1]: https://code.google.com/p/crypto-js/#MD5
 * [lodash]: http://lodash.com/docs
 */
define(function(require) {
    'use strict';
    // Dependencies
    var _ = require('lodash');

    // Expose public methods
    return {
        getProp: getProp,
        setProp: setProp,
        defineProp: defineProp,
        grep: grep,
        isDefined: isDefined,
        isDefinedOr: isDefinedOr,

        /**
         * Creates an object that inherits from the given prototype object.
         * http://lodash.com/docs#create
         * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
         *
         * @param {Object} proto The object which should be the prototype of the newly-created object.
         * @return {Object} Newly created object derived from the specified prototype.
         */
        create: isDefinedOr(Object.create, _.create),
    };

    /**
     * Gets the value of the property with the given key from the given object.
     * Select subvalues by dot-notation (e.g.: my.holy.key -> {my: {holy: {key: 'value'}}}).
     *
     * @param {String|Array} key The key of the requested value in dot-notation or as array.
     * @param {Object} [obj] The object that contains the key and the request value.
     * @return {*|undefined} The requested value from the given object identified by the given key.
     */
    function getProp(key, obj) {
        if (_.isArray(key)) {
            key = key.join('.');
        }

        obj = obj || {};
        var prop = void 0;
        if (key) {
            if (key.indexOf('.') > -1) {
                var split = key.split('.'),
                    subKey = split.shift();

                if (obj.hasOwnProperty(subKey)) {
                    prop = getProp(split.join('.'), obj[subKey]);
                }
            } else if (obj.hasOwnProperty(key)) {
                prop = obj[key];
            }
        }
        return prop;
    }

    /**
     * Sets the property defined by propDef to the given object
     * and assign the given value to that property.
     * Create the property chain by dot-notation (e.g.: my.holy.key -> {my: {holy: {key: value}}}).
     *
     * @param {Object} obj The object on which to set the property.
     * @param {String|Array} propDef The property definition in dot-notation or as array.
     * @param {Mixed} value The value of the property to be set.
     * @return {Object} The object with the newly set property.
     */
    function setProp(obj, propDef, value) {
        if (_.isArray(propDef)) {
            propDef = propDef.join('.');
        }

        obj = obj || {};
        if (propDef) {
            if (propDef.indexOf('.') > -1) {
                var split = propDef.split('.'),
                    subKey = split.shift();

                obj[subKey] = setProp({}, split.join('.'), value);
            } else {
                obj[propDef] = value;
            }
        }
        return obj;
    }

    /**
     * Defines a new property directly on the given object with the given key and value.
     *
     * @param {Object} obj The object on which to define the property.
     * @param {String} key The name of the property to be defined.
     * @param {Mixed} value the value of the property to be defined.
     * @return {Object} The object with the newly defined property.
     */
    function defineProp(obj, key, value) {
        var config = {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(obj, key, config);
        return obj;
    }

    /**
     * Basic function that searches / filters any object or function and returns matched properties.
     * Main area of use would be for DevTools purposes, when needing to find a specific property but only part of the property 
     * name is known.
     *
     * @param {Object} obj Target object
     * @param {String} strSearch Search string
     * @param {Boolean} isRecursive
     * @return {Object} Matched properties
     */
    function grep(obj, strSearch, isRecursive) {
        // Checks if seach string is not empty/undefined
        if (!strSearch) {
            return obj;
        }

        // Used to prevent maxing out callstack for sub-lookups due to __proto__ == Object
        isRecursive = isRecursive || false;

        // Declare necessary local variables to hold necessary values
        var objToIterate = obj,
            typeOfObject = typeof objToIterate,
            objKeys = [],
            objResult = {};

        // if item that needs to be iterated over is an object or function, get all properties ( including non enumerable properties )
        if (typeOfObject === 'object' || typeOfObject === 'function') {
            objKeys = Object.getOwnPropertyNames(objToIterate);
        }

        // Loop through all the properties
        objKeys.forEach(function(item) {
            var itemValue;

            // Check if key matches search string, if so add, if not, check if object and iterate through object's keys
            if (item.toLowerCase().indexOf(strSearch.toLowerCase()) >= 0) {
                itemValue = objToIterate[item];
            } else if (typeof objToIterate[item] === 'object' && !isRecursive) {
                itemValue = grep.call(objToIterate[item], strSearch, true);
            }

            // Check if Item Value has a value, if so, add to results
            if (itemValue) {
                objResult[item] = itemValue;
            }

        });

        // checks if objResult is empty, if so, return empty string.
        return (Object.getOwnPropertyNames(objResult).length) ? objResult : '';
    }

    /**
     * Checks whether the given value is defined or typeof undefined.
     * 
     * @param {Mixed} value Value to be checked.
     * @return {Boolean} True then the given value is defined, false otherwise.
     */
    function isDefined(value) {
        return typeof value !== 'undefined';
    }

    /**
     * Returns the given value if it is defined, otherwise the given orValue will be returned.
     * 
     * @param {Mixed} value Value to be checked and returned when it is defined.
     * @param {Mixed} orValue Alternate value which will be returned when the given value is undefined.
     * @return {Mixed} The value when defined, otherwise the orValue.
     */
    function isDefinedOr(value, orValue) {
        return isDefined(value) ? value : orValue;
    }
});