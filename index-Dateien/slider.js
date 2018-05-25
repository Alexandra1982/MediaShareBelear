/**
 * @class slider
 */
define(function (require) {
    'use strict';

    // Dependencies (other)
    var $ = require('jquery');
    require('royalslider');

    function init() {

        if ($(window).width() < 400) {
            var slider = $("#keyvisual-slider").royalSlider({
                autoScaleSlider: true,
                autoScaleSliderWidth: 400,
                autoScaleSliderHeight: 222,
                imageScaleMode: 'fit-if-smaller',
                imageScalePadding: 0,
                controlNavigation: 'none',
                arrowsNav: false,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: true,
                imgWidth: 400,
                imgHeight: 222,
                slidesSpacing: 0,
                loop: true,
                numImagesToPreload: 2,
                transitionType: 'fade',
                transitionSpeed: 1000,
                sliderDrag: false,
                keyboardNavEnabled: true,
                fullscreen: {
                    enabled: false
                },
                deeplinking: {
                    enabled: true,
                    change: false,
                    prefix: 'img'
                },
                autoPlay: {
                    enabled: true,
                    stopAtAction: false,
                    delay: 5000
                }
            });
        } else {
            var slider = $("#keyvisual-slider").royalSlider({
                autoScaleSlider: true,
                autoScaleSliderWidth: 1920,
                autoScaleSliderHeight: 615,
                imageScaleMode: 'fit-if-smaller',
                imageScalePadding: 0,
                controlNavigation: 'none',
                arrowsNav: false,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: true,
                imgWidth: 1920,
                imgHeight: 615,
                slidesSpacing: 0,
                loop: true,
                numImagesToPreload: 2,
                transitionType: 'fade',
                transitionSpeed: 1000,
                sliderDrag: false,
                keyboardNavEnabled: true,
                fullscreen: {
                    enabled: false
                },
                deeplinking: {
                    enabled: true,
                    change: false,
                    prefix: 'img'
                },
                autoPlay: {
                    enabled: true,
                    stopAtAction: false,
                    delay: 5000
                }
            });
        }

        $("#keyvisual-slider").data('royalSlider')
            .ev.on('rsBeforeAnimStart', function (event) {
                var slideId = this.currSlideId;
                var content = $('#keyvisual-slider .rs-verbrauch:eq(' + slideId + ') div');
                $('#rs-verbrauch-mobile').html(content.html());
            });

        var content = $('#keyvisual-slider .rs-verbrauch:eq(0) div');
        $('#rs-verbrauch-mobile').html(content.html());

        if ($('#keyvisual-slider .rs-caption').length == '0') {
            $('#rs-verbrauch-mobile').addClass('without-box');
        }

        if ($(window).width() < 400) {
            $('.royalSlider .rsImg').each(function () {
                var $element = $(this);
                var replaceSRC = $element.attr('src').replace('.jpg', '-mobile.jpg');
                $element.attr('src', replaceSRC);
            });
        }
    }

    function initContentSlider() {

        $('.content-slider').royalSlider({
            autoHeight: true,
            imageScaleMode: 'none',
            imageScalePadding: 0,
            controlNavigation: 'none',
            arrowsNav: true,
            arrowsNavAutoHide: false,
            loop: true,
            numImagesToPreload: 4,
            transitionSpeed: 1000,
            controlsInside: false,
            sliderDrag: false,
            keyboardNavEnabled: true,
            fullscreen: {
                enabled: false
            },
            deeplinking: {
                enabled: true,
                change: false,
                prefix: 'img'
            }
        });

    }

    // Expose to public
    return {
        init: init,
        initContentSlider: initContentSlider
    };
});
