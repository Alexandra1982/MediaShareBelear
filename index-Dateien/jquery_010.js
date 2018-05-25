$(function () {
    $.validator.methods.date = function (value, element) {

        if (this.optional(element)) {
            return true;
        }

        var valid = true;
        
        if (window.App.culture.dateFormat) {
            try {
                $.datepicker.parseDate(window.App.culture.dateFormat, value);
            } catch(err) {
                valid = false;
            }
        } else {
            valid = !/Invalid|NaN/.test(new Date(value));
        }
        
        return valid;

    };
});