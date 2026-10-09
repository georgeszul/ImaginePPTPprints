/**
 * Imagine PPTP Prints - Main JavaScript
 * Enhanced with jQuery and AJAX functionality
 */

(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function() {
        
        // ===== AJAX Contact Form Handler =====
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $submitBtn = $form.find('button[type="submit"]');
            const $responseMsg = $('#form-response-message');
            const originalBtnText = $submitBtn.html();
            
            // Show loading state
            $submitBtn.prop('disabled', true).html('<span class="spinner"></span> Sending...');
            $responseMsg.removeClass('show success error');
            
            // Execute reCAPTCHA
            grecaptcha.ready(function() {
                grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', {action: 'submit'}).then(function(token) {
                    
                    // Get form data
                    const formData = new FormData($form[0]);
                    formData.append('recaptcha_token', token);
                    
                    // Send AJAX request
                    $.ajax({
                        url: 'api/submit-contact.php',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // Show success message
                        $responseMsg
                            .addClass('show success')
                            .html('<i class="icon-check"></i> ' + response.message);
                        
                        // Reset form
                        $form[0].reset();
                        
                        // Hide message after 5 seconds
                        setTimeout(function() {
                            $responseMsg.removeClass('show');
                        }, 5000);
                        
                    } else {
                        // Show error message
                        let errorMsg = response.message || 'Something went wrong. Please try again.';
                        if (response.errors && response.errors.length > 0) {
                            errorMsg += '<br><ul>';
                            response.errors.forEach(function(error) {
                                errorMsg += '<li>' + error + '</li>';
                            });
                            errorMsg += '</ul>';
                        }
                        
                        $responseMsg
                            .addClass('show error')
                            .html('<i class="icon-alert"></i> ' + errorMsg);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX Error:', error);
                    $responseMsg
                        .addClass('show error')
                        .html('<i class="icon-alert"></i> Network error. Please try again or call us at (331) 255-5330.');
                },
                        complete: function() {
                            // Restore button state
                            $submitBtn.prop('disabled', false).html(originalBtnText);
                        }
                    });
                });
            });
        });
        
        // ===== Form Validation =====
        $('input[required], textarea[required]').on('blur', function() {
            const $input = $(this);
            const value = $input.val().trim();
            
            if (value === '') {
                $input.addClass('error');
            } else {
                $input.removeClass('error');
            }
        });
        
        // Email validation
        $('input[type="email"]').on('blur', function() {
            const $input = $(this);
            const email = $input.val().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                $input.addClass('error');
            } else {
                $input.removeClass('error');
            }
        });
        
        // ===== Smooth Scroll =====
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });
        
        // ===== Mobile Menu Toggle =====
        $('.hamburger').on('click', function() {
            $(this).toggleClass('active');
            $('.nav-menu').toggleClass('active');
        });
        
        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.navbar').length) {
                $('.hamburger').removeClass('active');
                $('.nav-menu').removeClass('active');
            }
        });
        
        // ===== Search Toggle =====
        $('.search-toggle').on('click', function() {
            $('.search-dropdown').toggleClass('active');
            $('.search-input').focus();
        });
        
        // ===== Floating WhatsApp Button =====
        function createWhatsAppButton() {
            const whatsappBtn = $('<a>', {
                href: 'https://wa.me/13312555330',
                target: '_blank',
                class: 'floating-whatsapp',
                html: '<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
            });
            
            $('body').append(whatsappBtn);
        }
        
        createWhatsAppButton();
        
        // ===== Numbers Counter Animation =====
        function animateCounter($element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                $element.text(Math.floor(current) + '+');
            }, 16);
        }
        
        // Trigger counter animation when in viewport
        const $counters = $('.counter-number');
        if ($counters.length) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const $counter = $(entry.target);
                        const target = parseInt($counter.data('target'));
                        animateCounter($counter, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            $counters.each(function() {
                observer.observe(this);
            });
        }
        
        // ===== Testimonials Auto-rotate =====
        let currentTestimonial = 0;
        const $testimonials = $('.testimonial-item');
        
        if ($testimonials.length > 1) {
            setInterval(function() {
                $testimonials.eq(currentTestimonial).removeClass('active');
                currentTestimonial = (currentTestimonial + 1) % $testimonials.length;
                $testimonials.eq(currentTestimonial).addClass('active');
            }, 5000);
        }
        
        // ===== Lazy Load Images =====
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            $('.lazy').each(function() {
                imageObserver.observe(this);
            });
        }
        
        // ===== Scroll to Top Button =====
        const $scrollTop = $('<button>', {
            class: 'scroll-to-top',
            html: '↑',
            click: function() {
                $('html, body').animate({ scrollTop: 0 }, 600);
            }
        });
        
        $('body').append($scrollTop);
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $scrollTop.addClass('show');
            } else {
                $scrollTop.removeClass('show');
            }
        });
        
    });
    
})(jQuery);

