/**
 * @class quickfeedback
 */
define(function (require) {
    'use strict';

    // Dependencies (modules)
    var Dom = require('dom-helper');
    
    // Dependencies (other)
    var $ = require('jquery');

    var map = {
        
        form: '#quick-feedback form',
        submitButton: '#quick-feedback button[type="submit"]',
        
        nameField: '#quick-feedback form #Name',
        emailField: '#quick-feedback form #EMail',
        messageField: '#quick-feedback form #Message'
    };
    
    function init() {

        // map all declared elements to jquery instances
        map = Dom.map(map);

        map.submitButton.on('click', function (e) {
            e.preventDefault();
            map.form.validate();
            if (map.form.valid()) {
                map.submitButton
                        .attr('disabled', true)
                        .css('opacity', 0.3);
                $.post(map.form.attr('action'), map.form.serialize())
                    .done(function (result) {
                        alert(result.Message);
                        if (result.IsSuccess) {
                            map.nameField.val('');
                            map.emailField.val('');
                            map.messageField.val('');
                            $.magnificPopup.instance.close();
                        } 
                    }).always(function (result) {
                        map.submitButton
                            .attr('disabled', false)
                            .css('opacity', 1);
                    });
            }
        }); 
    }

    // Expose to public
    return {
        init: init
    };
});