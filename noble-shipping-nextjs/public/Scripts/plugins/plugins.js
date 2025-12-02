(function($) {
    'use strict';
    
    // Sticky Header
    function stickyHeader() {
        var header = $('#header-sticky');
        if (header.length) {
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > 100) {
                    header.addClass('sticky');
                } else {
                    header.removeClass('sticky');
                }
            });
        }
    }
    
    // Background Image Data Attribute
    function backgroundImage() {
        $('[data-background]').each(function() {
            var bg = $(this).data('background');
            if (bg) {
                $(this).css('background-image', 'url(' + bg + ')');
            }
        });
    }
    
    // Mobile Menu Toggle
    function mobileMenuToggle() {
        $('.mobile-menu-toggle').on('click', function(e) {
            e.preventDefault();
            $('.mobile-menu').toggleClass('active');
        });
    }
    
    // Search Modal
    function searchModal() {
        $('.header-search a').on('click', function(e) {
            e.preventDefault();
            $('#search-modal').modal('show');
        });
    }
    
    // Preloader
    function preloader() {
        $(window).on('load', function() {
            $('#preloader').fadeOut('slow', function() {
                $(this).remove();
            });
        });
    }
    
    // Smooth Scroll for Anchor Links
    function smoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                    return false;
                }
            }
        });
    }
    
    // Initialize all plugins
    function initPlugins() {
        stickyHeader();
        backgroundImage();
        mobileMenuToggle();
        searchModal();
        preloader();
        smoothScroll();
    }
    
    // DOM Ready
    $(document).ready(function() {
        initPlugins();
    });
    
    // Window Load
    $(window).on('load', function() {
        preloader();
    });
    
})(jQuery);