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
        reviewsIndex: '.reviews-index',
        reviewIndexItem: '.reviews-index .review-item',
        reviewIndexText: '.reviews-index .review-text',
        reviewIndexName: '.reviews-index .review-name',
        reviewIndexRatingStars: '.reviews-index .review-rating-stars',
        reviewSummary: '#reviewSummary',
        reviewSummaryRating: '#reviewSummary #reviewSummaryRating',
        reviewSummaryRatingStars: '#reviewSummary .review-rating-stars'
    };

    var reviewIndexStarsWidth = 175;
    var reviewFooterStarsWidth = 175;
    var starsQuantity = 5;
    var hasData;

    function calculateStarsRating(starsWidth, rating) {
        return (starsWidth / starsQuantity) * rating;
    }

    function roundCustom(x) {
        var k = (Math.round(x * 100) / 100).toString();
        k += (k.indexOf('.') == -1) ? '.0' : '0';
        var p = k.indexOf('.');
        return k.substring(0, p) + ',' + k.substring(p + 1, p + 2);
    }
    
    function init(page) {

        // map all declared elements to jquery instances
        map = Dom.map(map);

        // reviews in content (frontpage)
        if (page == 'index') {
            $.getJSON('api/reviews/list')
                .done(function (result) {
                    map.reviewIndexItem.each(function (i) {
                        if (result[i]) {
                            var reviewText = result[i]['review'];
                            if (reviewText) {
                                $(this).find(map.reviewIndexText).html(reviewText);
                            } else {
                                $(this).find(map.reviewIndexText).hide();
                            }

                            var reviewName = result[i]['screenname'];
                            if (reviewName) {
                                $(this).find(map.reviewIndexName).html(reviewName);
                            } else {
                                $(this).find(map.reviewIndexName).hide();
                            }

                            var reviewRateStars = calculateStarsRating(reviewIndexStarsWidth, result[i]['rating']);
                            if (reviewRateStars) {
                                $(this).find(map.reviewIndexRatingStars).css({ width: reviewRateStars + 'px' });
                            } else {
                                $(this).find(map.reviewIndexRatingStars).hide();
                            }

                            if (reviewText && reviewRateStars) {
                                $(this).show();
                                hasData = true;
                            }
                        }
                    });

                    // show reviews
                    if (hasData === true) {
                        map.reviewsIndex.show();
                    }
            });
        }

        // reviews in footer
        if (page == 'footer') {
            $.getJSON('api/reviews/summary')
                .done(function (result) {
                    var reviewAverage = result['average'];
                    if (reviewAverage) {
                        map.reviewSummaryRating.html('(' + roundCustom(reviewAverage) + ')');
                    } else {
                        map.reviewSummaryRating.hide();
                    }
                    
                    var reviewRateStars = calculateStarsRating(reviewFooterStarsWidth, result['average']);
                    if (reviewRateStars) {
                        map.reviewSummaryRatingStars.css({ width: reviewRateStars + 'px' });
                        map.reviewSummary.show();
                    }
            });
        }

    }

    // Expose to public
    return {
        init: init,

        calculateStarsRating: calculateStarsRating,

        roundCustom: roundCustom
    };
});