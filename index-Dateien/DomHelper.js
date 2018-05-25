/**
 * @class webmodules.helpers.DomHelper
 * @alternateClassName DomHelper
 *
 * @alias dom-helper
 *
 * # Summary
 *
 * Helps, eases and optimizes the selection of elements in the Document Object Model (DOM).
 * Wraps the jquery mechanism to select elements and store their references internal to
 * avoid unnecessarily reselecting the same elements over and over again.
 *
 * ## Requires
 *
 * - [jQuery][1]
 *
 * ## Examples
 *
 * ** Select element with selector **
 *
 *     @example
 *     require(['dom-helper'], function(Dom){
 *       //var Dom = require('dom-helper');
 *
 *       // returns selected element
 *       var el = Dom.select('#console');
 *       Docs.log(el.selector);
 *     });
 *
 * ** Reselect element with selector **
 *
 *     @example
 *     require(['dom-helper'], function(Dom){
 *       //var Dom = require('dom-helper');
 *
 *       // returns reselected element (newly select!)
 *       var el = Dom.reselect('#console');
 *       Docs.log(el.selector);
 *     });
 *
 * ** Select element with selector and format parameters **
 *
 *     @example
 *     require(['dom-helper', 'jquery'], function(Dom, $){
 *       //var Dom = require('dom-helper');
 *
 *       // Create pseudo element
 *       Docs.add.markup('<input data-type="email"/>');
 *
 *       // returns selected element with the selector "input[data-type=email]"
 *       var el = Dom.select('{0}[data-type={1}]', 'input', 'email');
 *       Docs.log(el.selector);
 *     });
 *
 * ** Map Array of element selectors **
 *
 * Note that when you map an array of selectors, the selectors of the map will
 * be used as keys for the mapped selectors element.
 *
 *     @example
 *     require(['dom-helper'], function(Dom){
 *       //var Dom = require('dom-helper');
 *
 *       // Array of selectors to be mapped
 *       var map = ['body', '#console', '#container'];
 *
 *       // Map selectors to their selected element
 *       map = Dom.map(map);
 *       for (var key in map) {
 *         Docs.log(key + ' = ' + map[key].selector);
 *       }
 *     });
 *
 * ** Map Object of element keys and their selectors **
 *
 * Note that when you map an object of selectors, the keys of the selector map will
 * be used as keys for the mapped selectors element.
 *
 *     @example
 *     require(['dom-helper'], function(Dom){
 *       //var Dom = require('dom-helper');
 *
 *       // Object of selectors to be mapped
 *       var map = {
 *           body: 'body',
 *           console: '#console',
 *           container: '#container'
 *       };
 *
 *       // Map selectors to their selected element by their key
 *       map = Dom.map(map);
 *       for (var key in map) {
 *           Docs.log(key + ' = ' + map[key].selector);
 *       }
 *     });
 *
 * [1]: http://jquery.com/
 */
define(function(require) {
    'use strict';

    // Dependencies
    var $ = require('jquery');
    var StringHelper = require('string-helper');

    function DomHelper(name) {
        var namespaced = typeof name !== 'undefined';
        this.name = name || '__DEFAULT__';

        this.dom[this.name] = this.dom[this.name] || {};

        // Delete namespace setter
        if (namespaced) {
            delete this.namespace;
        }
    }

    DomHelper.prototype = {
        constructor: DomHelper,

        /**
         * @property {Object} DOM
         * Contains all selected DOM element references identified by their specific selector.
         *
         * @private
         */
        dom: {},

        // Methods
        namespace: namespace,
        element: element,
        select: select,
        reselect: reselect,
        map: map,
        checkSelector: checkSelector,
        getScrollbarWidth: getScrollbarWidth
    };

    /**
     * Create a namespaced {@link DomHelper} with the given namespace and
     * a subset dom map which is identified by the given namespace.
     *
     * @param {String} name - The namespace
     * @return {Object} The newly created namespaced DomHelper instance
     */
    function namespace(name) {
        return new DomHelper(name);
    }

    /**
     * Get or set the given element by the given selector into/from the internal namespaced dom.
     * 
     * @param {String} selector The selector of the given/requested element
     * @param {Object} el The element to be setted.
     * @return {Object|null} The stored/requsted element or null.
     */
    function element(selector, el) {
        if (typeof this.dom[this.name] === 'undefined') {
            throw new Error('DomHelper undefined namespace. Given ' + this.name);
        }
        if (selector) {
            if (el) {
                // Set
                return this.dom[this.name][selector] = el;
            } else {
                // Get
                if (typeof this.dom[this.name][selector] !== 'undefined') {
                    return this.dom[this.name][selector];
                }
            }
        }
        return null;
    }

    /**
     * Select an element of the DOM by its selector. If this element was
     * already selected before by the same selector, the stored reference 
     * of this selection will be returned in order to prevent reselecting
     * that element.
     *
     * @param {String|Object} selector - Selector to select the element (string) or the already selected element (object).
     * @return {Object} The new selected (or already stored) element.
     */
    function select(selector) {
        if (!selector) {
            throw new Error('There is no selector given to select a DOM element! Given selector: ' + selector);
        }

        // Support selecting an already selected element
        if (typeof selector === 'object') {
            if (selector.hasOwnProperty && selector.hasOwnProperty('selector')) { // hasOwnProperty is missing in IE8 if selector is a DOM element
                selector = selector.selector;
            } else if (selector.length) {
                // Already selected element
                return selector;
            }
        } else {
            // Format the given selector
            selector = StringHelper.format.apply(null, arguments);
        }

        if (this.element(selector) && this.element(selector).selector === selector) {
            return this.element(selector);
        }
        return this.reselect(selector);
    }

    /**
     * Reselect an element of the DOM by its selector. Regardless of whether
     * the element was selected before by the same given selector, the element
     * will be selected again.
     *
     * @param {String} selector - Selector to select the element
     * @return {Object} The new selected element
     */
    function reselect() {
        var selector = StringHelper.format.apply(null, arguments);
        return this.element(selector, $(selector));
    }

    /**
     * Map an array of selectors and return a map with the selectors as keys
     * and their selected elements as value.
     *
     * @param {Array|Object} selectors - The list of selectors
     * @param {Boolean} [reselect=false] - Set to true in order to reselect 
                                           the elements and ignore previous
                                           selections of the same elements
     * @return {Object} map with selectors and their selected elements
     */
    function map(selectors, doReselect) {
        var result = {},
            that = this;

        if ($.isArray(selectors)) {
            $.each(selectors, function(i, selector) {
                result[selector] = doReselect ? that.reselect(selector) : that.select(selector);
            });
        } else {
            $.each(selectors, function(key, selector) {
                result[key] = doReselect ? that.reselect(selector) : that.select(selector);
            });
        }
        return result;
    }

    /**
     * Checks whether the given selector is valid to use it for validation bindings.
     * Therefor the selector has to be a jquery object or a string selector.
     * 
     * @param {Object|String} selector The selector to be checked.
     * @return {Object} The selector as jquery object.
     */
    function checkSelector(selector) {
        if (typeof selector === 'string') {
            return this.reselect(selector);
        }

        if (selector) {
            return selector;
        }

        throw new Error('Invalid selector given for validation. Selector has to be a jquery object or a string selector. Given: ' + typeof selector);
    }

    /**
     * Gets the width of the browsers native scrollbar by creating a scrollbar
     * using two temporarily created divs.
     *
     * @return {Number} The width of a native scrollbar (in pixels).
     */
    function getScrollbarWidth() {
        if (typeof this.scrollbarWidth === 'undefined') {
            var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
            var child = parent.children();
            this.scrollbarWidth = child.innerWidth() - child.height(99).innerWidth();
            parent.remove();
        }

        return this.scrollbarWidth;
    }

    // Expose to public
    return new DomHelper();
});