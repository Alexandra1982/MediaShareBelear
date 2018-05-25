//  RequireJS Config
// --------------------------------------
require.config({
    
    // Base url. RequireJS will load all code relative to this path.
    baseUrl: 'Content/Scripts/',

    // The number of seconds to wait before giving up on loading a script. 
    // Setting it to 0 disables the timeout. The default is 7 seconds.
    waitSeconds: 120,

    paths: {
        
        // Vendor
        'require'                           : 'require',
        'lodash'                            : '../vendor/lodash/lodash.min',
        'storejs'                           : '../vendor/pxchosted/storejs/store',
        'async'                             : '../vendor/requirejs-plugins/src/async',

        'royalslider'                       : '../vendor/pxchosted/royalslider/jquery.royalslider.min',
        'magnific-popup'                    : '../vendor/magnific-popup/dist/jquery.magnific-popup.min',
        'lazyload'                          : '../vendor/jquery.lazyload/jquery.lazyload',
        'respondjs'                         : '../vendor/respond/dest/respond.min',
        'syncheight'                        : '../vendor/jquery.syncHeight/jquery.syncheight.min',
        'sticky-kit'                        : '../vendor/sticky-kit/jquery.sticky-kit.min',
        'scrollbox'                         : '../vendor/jquery-scrollbox/jquery.scrollbox.min',
        'isotope'                           : '../vendor/isotope/dist/isotope.pkgd.min',
        'jquery-bridget'                    : '../vendor/jquery-bridget/jquery.bridget',
        'js-cookie'                         : '../vendor/js-cookie/src/js.cookie',
        'googletagmanager'                  : '../vendor/googletagmanager/googletagmanager',
        'is-on-screen'                      : '../vendor/isOnScreen/jquery.isonscreen.min',
        
        // jQuery
        'jquery'                            : '../vendor/jquery/dist/jquery.min',
        'jquery-progressbar'                : '../vendor/pxchosted/jquery/jquery.progressbar',

        // jQuery UI
        'jquery-ui'                         : '../vendor/jquery-ui/jquery-ui.min',
        'jquery-ui-de'                      : '../vendor/pxchosted/jquery/i18n/jquery.ui.datepicker-de',
        'jquery-ui-fr'                      : '../vendor/pxchosted/jquery/i18n/jquery.ui.datepicker-fr',
        
        // jQuery MVC Validation
        'jquery-validate-base'              : '../vendor/jquery.validate/dist/jquery.validate.min',
        'jquery-validate'                   : '../vendor/pxchosted/jquery/jquery.validate.date',
        'jquery-validate-unobtrusive'       : '../vendor/pxchosted/jquery/jquery.validate.unobstrusive',
        'jquery-form-extends'               : '../vendor/pxchosted/jquery/jquery.formExtends',
        'microsoft-ajax'                    : '../vendor/pxchosted/microsoft/MicrosoftAjax',
        'microsoft-mvc-ajax'                : '../vendor/pxchosted/microsoft/MicrosoftMvcAjax',
        'microsoft-mvc-validation'          : '../vendor/pxchosted/microsoft/MicrosoftMvcValidation',

        // modules
        'modules'                           : 'modules',
        'log'                               : 'modules/Log',
        'storage'                           : 'modules/Storage',
        'version'                           : 'modules/Version',
        
        // modules: helpers
        'dom-helper'                        : 'modules/helpers/DomHelper',
        'object-helper'                     : 'modules/helpers/ObjectHelper',
        'string-helper'                     : 'modules/helpers/StringHelper',

        // modules: ui
        'tabs'                              : 'modules/ui/Tabs',
        'ui-validation'                     : 'modules/ui/validation/Validation',
        'ui-validation-extensions'          : 'modules/ui/validation/Validation.Extensions',
        'ui-validation-rules'               : 'modules/ui/validation/Validation.Rules',

        'jquery-tablesort'                  : 'modules/jquery/jquery.tablesorter.min',

        'history'                           : 'modules/helpers/history.min',

        // slider
        'slider'                            : 'app/slider/slider',
        
        // Wizard
        'wizard'                            : 'app/wizard/wizard',
        'maps'                              : 'app/wizard/maps',
        'filter'                            : 'app/wizard/filter',

        // Reviews (eKomi)
        'reviews'                           : 'app/wizard/reviews',

        // Quick-Feedback in Meta Nav
        'quickfeedback'                     : 'app/contact/quickfeedback',

    },

    shim: {

        // jQuery
        'jquery'                            : { exports: 'jQuery' },
        'jquery-progressbar'                : ['jquery'],
        
        // jQuery UI
        'jquery-ui'                         : ['jquery'],
        'jquery-ui-de'                      : ['jquery-ui'],
        'jquery-ui-fr'                      : ['jquery-ui'],
        'jquery-tablesort'                  : ['jquery-ui'],
        
        // jQuery MVC Validation
        'jquery-form-extends'               : ['jquery'],
        'jquery-validate'                   : ['jquery', 'jquery-validate-base'],
        'jquery-validate-unobtrusive'       : ['jquery', 'jquery-validate'],
        'microsoft-ajax'                    : ['jquery'],
        'microsoft-mvc-ajax'                : ['jquery', 'microsoft-ajax'],
        'microsoft-mvc-validation'          : ['jquery', 'jquery-validate-unobtrusive'],
        
        'royalslider'                       : ['jquery'],
        'magnific-popup'                    : ['jquery'],
        'lazyload'                          : ['jquery'],
        'syncheight'                        : ['jquery'],
        'sticky-kit'                        : ['jquery'],
        'scrollbox'                         : ['jquery'],
        'is-on-screen'                      : ['jquery'],
        'history'                           : ['jquery']
    }
});
