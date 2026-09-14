/**
 * FTS Industry Blocks - Frontend JS
 *
 * Handles:
 * - Platform Tabs switching (show/hide panels)
 * - Testimonial Owl Carousel initialization
 */
(function($) {
    'use strict';

    /**
     * Initialize tab switching for Platform Tabs block
     */
    function initPlatformTabs() {
        $('.tabs-fts-element .tab').on('click', function() {
            var tabId = $(this).data('fts-tab');

            // Update active tab
            $(this).closest('.tabs-fts-element').find('.tab').removeClass('tab--active');
            $(this).addClass('tab--active');

            // Show matching panel
            $(this).closest('.container').find('.featured-tab-panels .featured-tab').hide();
            $(this).closest('.container').find('#' + tabId).show();
        });
    }

    /**
     * Initialize Owl Carousel for Reviews block (3+ items only)
     * Wires up custom slider control: prev/next arrows + bar dots.
     */
    function initReviewsCarousel() {
        if (typeof $.fn.owlCarousel === 'undefined') {
            return;
        }

        $('.reviews-section').each(function() {
            var $section = $(this);
            var $carousel = $section.find('.reviews-carousel');

            if ($carousel.length === 0 || $carousel.hasClass('owl-loaded')) {
                return;
            }

            var $prev = $section.find('.reviews-slider-control__prev');
            var $next = $section.find('.reviews-slider-control__next');
            var $dotsHost = $section.find('.reviews-slider-control__dots');

            $carousel.owlCarousel({
                loop: false,
                margin: 32,
                nav: false,
                dots: true,
                dotsContainer: $dotsHost.length ? $dotsHost.get(0) : false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    }
                }
            });

            // Wire up custom prev/next buttons
            $prev.off('click.fts-reviews').on('click.fts-reviews', function() {
                $carousel.trigger('prev.owl.carousel');
            });
            $next.off('click.fts-reviews').on('click.fts-reviews', function() {
                $carousel.trigger('next.owl.carousel');
            });
        });
    }

    /**
     * Initialize Owl Carousel for Related Articles block
     */
    function initRelatedCarousel() {
        if (typeof $.fn.owlCarousel === 'undefined') {
            return;
        }

        $('.related-carousel').each(function() {
            if ($(this).hasClass('owl-loaded')) {
                return;
            }

            $(this).owlCarousel({
                loop: true,
                margin: 32,
                nav: false,
                dots: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    }
                }
            });
        });
    }

    /**
     * Initialize Owl Carousel for Testimonials block
     */
    function initTestimonialCarousel() {
        if (typeof $.fn.owlCarousel === 'undefined') {
            return;
        }

        $('.testimonial-carousel').each(function() {
            if ($(this).hasClass('owl-loaded')) {
                return; // Already initialized
            }

            $(this).owlCarousel({
                loop: true,
                margin: 32,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    }
                }
            });
        });
    }

    // Initialize on DOM ready
    $(document).ready(function() {
        initPlatformTabs();
        initTestimonialCarousel();
        initRelatedCarousel();
        initReviewsCarousel();
    });

    // Re-initialize after Gutenberg block preview renders
    if (window.acf) {
        window.acf.addAction('render_block_preview/type=fts-platform-tabs', function($el) {
            initPlatformTabs();
        });
        window.acf.addAction('render_block_preview/type=fts-testimonials', function($el) {
            setTimeout(initTestimonialCarousel, 200);
        });
        window.acf.addAction('render_block_preview/type=fts-related', function($el) {
            setTimeout(initRelatedCarousel, 200);
        });
        window.acf.addAction('render_block_preview/type=fts-reviews', function($el) {
            setTimeout(initReviewsCarousel, 200);
        });
    }

})(jQuery);