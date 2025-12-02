(function($) {
    'use strict';
    
    // AJAX Form Handler
    function initAjaxForms() {
        $('.ajax-form').on('submit', function(e) {
            e.preventDefault();
            
            var form = $(this);
            var formData = new FormData(this);
            var submitBtn = form.find('button[type="submit"]');
            var originalText = submitBtn.text();
            
            submitBtn.prop('disabled', true).text('Sending...');
            
            $.ajax({
                url: form.attr('action') || '/api/contact',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        form[0].reset();
                        if (typeof Swal !== 'undefined') {
                            Swal.fire('Success!', 'Message sent successfully!', 'success');
                        } else {
                            alert('Message sent successfully!');
                        }
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire('Error!', response.message || 'Failed to send message', 'error');
                        } else {
                            alert('Failed to send message');
                        }
                    }
                },
                error: function() {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
                    } else {
                        alert('An error occurred. Please try again.');
                    }
                },
                complete: function() {
                    submitBtn.prop('disabled', false).text(originalText);
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        initAjaxForms();
    });
    
})(jQuery);