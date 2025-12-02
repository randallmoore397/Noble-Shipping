(function ($) {
    'use strict';

    // Main initialization function
    // NOTE: Most plugin initialization is handled by src/hooks/useLayoutScripts.ts
    // This file only handles legacy concerns not covered by React hooks
    function initMain() {

        // Tooltip and Popover initialization (Bootstrap-specific, not in hooks)
        if (typeof bootstrap !== 'undefined') {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });

            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }

        // Form Validation and Submission (legacy form handling)
        $('.contact-form form').on('submit', function (e) {
            e.preventDefault();
            // Handle form submission
        });
    }

    // DOM Ready
    $(document).ready(function () {
        initMain();
    });

    // Window Load
    $(window).on('load', function () {
        // Refresh AOS after all resources are loaded
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });

})(jQuery);