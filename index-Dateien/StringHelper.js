/**
 * @class webmodules.helpers.StringHelper
 * @alternateClassName StringHelper
 *
 * @alias string-helper
 *
 * # Summary
 *
 * ** Provides a set of useful helper functions to ease and standardize the work with Strings. **
 *
 * ## Requires
 *
 * - {@link ObjectHelper}
 *
 * ## Examples
 *
 * ** join **
 *
 *     @example
 *     require(['string-helper'], function(StringHelper){
 *       //var StringHelper = require('string-helper');
 *
 *       var path = StringHelper.join('s1', '/s2', './s3', '');
 *       Docs.log(path);
 *     });
 *
 * ** format **
 *
 *     @example
 *     require(['string-helper'], function(StringHelper){
 *       //var StringHelper = require('string-helper');
 *
 *       var format = StringHelper.format('{0} is dead, but {1} is alive! {0} {2}', 'Java', 'JavaScript');
 *       Docs.log(format);
 *     });
 */
define(function (require) {
    'use strict';
    
    // Dependencies
    var ObjectHelper = require('object-helper');

    /**
     * Joins path segments. Preserves initial '/' and resolves '..' and '.'
     * Does not support using '..' to go above/outside the root.
     * This means that join('foo', '../../bar') will not resolve to '../bar'.
     * (inspired by https://gist.github.com/creationix/7435851)
     *
     * @param {String...} segments Variable number of path segments.
     * @return {String} Joint path segments.
     */
    var join = function () {
        // Split the inputs into a list of path commands.
        var parts = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            parts = parts.concat(arguments[i].split('/'));
        }
        // Interpret the path commands to get the new resolved path.
        var newParts = [];
        for (i = 0, l = parts.length; i < l; i++) {
            var part = parts[i];
            // Remove leading and trailing slashes
            // Also remove '.' segments
            if (!part || part === '.') {
                continue;
            }
            // Interpret '..' to pop the last segment
            if (part === '..') {
                newParts.pop();
            }
                // Push new path segments.
            else {
                newParts.push(part);
            }
        }
        // Preserve the initial slash if there was one.
        if (parts[0] === '') {
            newParts.unshift('');
        }
        // Turn back into a single string path.
        return newParts.join('/') || (newParts.length ? '/' : '.');
    };

    /**
     * JavaScript equivalent to printf/string.format.
     * (inspired by http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436)
     *
     * @param {String} str The string to be formatted.
     * @param {String...|Number...} values Variable number of values to fill the placeholder(s) within the given string.
     * @return {String} The formatted string.
     */
    var format = function (str) {
        if (typeof str !== 'string') {
            return str;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });
    };

    /**
     * Replace the named {placeholder} within the given string with their replacements.
     * Optional {placeholder}? will be replaced by their respective replacement or an empty string
     * if there is no suitable replacement.
     *
     * @param {String} str The string with the placeholders inside.
     * @param {Object} replacement Object contains the placeholders (key) and their replacements (value).
     * @return {String} The string with the replaced placeholders.
     */
    var replace = function (str, replacements) {
        return str.replace(/\{\w+(\.\w+)?\}\??/g, function (token) {
            var key = token.replace(/\{|\}|\?/g, '');
            return ObjectHelper.getProp(key, replacements) || (endsWith(token, '?') ? '' : token);
        });
    };

    /**
     * Check if a string starts with particular character(s).
     *
     * @param {String} str String that should get checked whether it starts with particular character(s).
     * @param {String} prefix Particular character(s).
     * @return {Boolean} True when the given string starts with the given suffix, false otherwise.
     */
    var startsWith = function (str, prefix) {
        return str.indexOf(prefix) === 0;
    };

    /**
     * Check if a string ends with particular character(s).
     *
     * @param {String} str String that should get checked whether it ends with particular character(s).
     * @param {String} suffix Particular character(s).
     * @return {Boolean} True when the given string ends with the given suffix, false otherwise.
     */
    var endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };

    /**
     * The trim() method removes whitespace from both ends of a string.
     * Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.)
     * and all the line terminator characters (LF, CR, etc.).
     * 
     * @param {String} str String to be trimmed.
     * @return {String} The trimmed string.
     */
    var trim = function(str) {
        return String.prototype.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };

    /**
     * Replaces space with dash and make all letters lower case.
     * 
     * @param {String} str String to be dashed.
     * @return {String} The dashed string.
     */
    var toDashed = function(str) {
        return str.replace(/\s+/g, '-').toLowerCase();
    };

    /**
     * Trim a file extension from the given string.
     *
     * @param {String} str String to be trimmed from its file extension.
     * @return {String} The file extension free string.
     */
    var removeExtension = function(str) {
        var lastDotPosition = str.lastIndexOf('.');
        return (lastDotPosition === -1) ? str : str.substr(0, lastDotPosition);
    };

    // Expose public methods
    return {
        join: join,
        format: format,
        replace: replace,
        startsWith: startsWith,
        endsWith: endsWith,
        trim: trim,
        toDashed: toDashed,
        removeExtension: removeExtension
    };
});
