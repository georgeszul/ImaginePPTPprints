/**
 * Visual Effects & Animations
 * Parallax, Dark Mode, Interactive Elements
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        
        // ===== Parallax Scrolling Effect =====
        function initParallax() {
            const parallaxElements = $('.parallax-bg, .parallax-element');
            
            $(window).on('scroll', function() {
                const scrolled = $(window).scrollTop();
                
                parallaxElements.each(function() {
                    const $el = $(this);
                    const speed = $el.data('speed') || 0.5;
                    const offset = $el.offset().top;
                    const yPos = -(scrolled - offset) * speed;
                    
                    $el.css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
                });
            });
        }

        // ===== Dark Mode Toggle DISABLED =====
        // Dark mode toggle disabled - removed day/night switch
        function initDarkMode() {
            // DISABLED - Dark mode toggle removed
            return;
            
            // Original code commented out:
            /*
            // Create dark mode toggle button
            const toggleHTML = `
                <button class="theme-toggle" aria-label="Toggle theme">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="moon-icon" style="display:none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
            `;
            
            $('body').append(toggleHTML);
            
            // Check saved preference
            const savedTheme = localStorage.getItem('theme') || 'dark';
            $('body').addClass(savedTheme + '-mode');
            
            // Toggle functionality
            $('.theme-toggle').on('click', function() {
                const $body = $('body');
                const isDark = $body.hasClass('dark-mode');
                
                $body.removeClass('dark-mode light-mode');
                $body.addClass(isDark ? 'light-mode' : 'dark-mode');
                
                $('.sun-icon, .moon-icon').toggle();
                
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
            });
            
            // Update icon based on current theme
            if (savedTheme === 'light') {
                $('.sun-icon').hide();
                $('.moon-icon').show();
            }
            */
        }

        // ===== Sticky CTA Button DISABLED =====
        // Sticky CTA button disabled - was showing "Get Your Free Quote" at bottom
        function initStickyCTA() {
            // DISABLED - Sticky CTA button removed
            return;
            
            // Original code commented out:
            /*
            const stickyCTA = $(`
                <a href="contact.php" class="sticky-cta">
                    <span>📞</span> Get Your Free Quote
                </a>
            `);
            
            $('body').append(stickyCTA);
            
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 800) {
                    stickyCTA.addClass('show');
                } else {
                    stickyCTA.removeClass('show');
                }
            });
            */
        }

        // ===== Intersection Observer for Animations =====
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.stagger-fade');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100); // Stagger animation
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            animatedElements.forEach(el => observer.observe(el));
        }

        // ===== Skeleton Loading Screens =====
        function showSkeletonLoading() {
            $('.gallery-image, .service-image').each(function() {
                const $img = $(this);
                const $skeleton = $('<div class="skeleton skeleton-image"></div>');
                
                $img.before($skeleton);
                
                $img.on('load', function() {
                    $skeleton.fadeOut(300, function() {
                        $(this).remove();
                    });
                    $img.addClass('loaded');
                });
                
                // Fallback if image fails
                $img.on('error', function() {
                    $skeleton.remove();
                });
            });
        }

        // ===== Smooth Parallax on Hero =====
        function initHeroParallax() {
            const $hero = $('.hero');
            const $heroContent = $('.hero-content');
            
            $(window).on('scroll', function() {
                const scrolled = $(window).scrollTop();
                const heroHeight = $hero.outerHeight();
                
                if (scrolled < heroHeight) {
                    const opacity = 1 - (scrolled / heroHeight);
                    const translateY = scrolled * 0.5;
                    
                    $heroContent.css({
                        'transform': 'translateY(' + translateY + 'px)',
                        'opacity': opacity
                    });
                }
            });
        }

        // ===== Card Tilt Effect (3D) =====
        function initCardTilt() {
            $('.feature-card, .service-card').on('mousemove', function(e) {
                const $card = $(this);
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                $card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
            });
            
            $('.feature-card, .service-card').on('mouseleave', function() {
                $(this).css('transform', '');
            });
        }

        // ===== Text Reveal Animation =====
        function initTextReveal() {
            const textElements = $('.hero-title, .section-title');
            
            textElements.each(function() {
                const $el = $(this);
                const text = $el.text();
                const letters = text.split('');
                
                $el.html('');
                
                letters.forEach((letter, index) => {
                    const $span = $('<span>').text(letter === ' ' ? '\u00A0' : letter);
                    $span.css({
                        'display': 'inline-block',
                        'opacity': '0',
                        'transform': 'translateY(20px)',
                        'animation': `fade-in-up 0.5s ease forwards ${index * 0.03}s`
                    });
                    $el.append($span);
                });
            });
        }

        // ===== Cursor Trail Effect DISABLED =====
        // Cursor trail disabled - was causing blue dot to follow cursor
        function initCursorTrail() {
            // DISABLED - Cursor trail effect removed
            return;
            
            // Original code commented out:
            /*
            const trail = [];
            const trailLength = 20;
            
            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.className = 'cursor-trail';
                dot.style.cssText = `
                    position: fixed;
                    width: ${12 - i * 0.5}px;
                    height: ${12 - i * 0.5}px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, ${1 - i * 0.05});
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s;
                    display: none;
                `;
                document.body.appendChild(dot);
                trail.push(dot);
            }
            
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            setInterval(() => {
                trail.forEach((dot, index) => {
                    const next = trail[index + 1] || trail[0];
                    dot.style.left = next.style.left || mouseX + 'px';
                    dot.style.top = next.style.top || mouseY + 'px';
                    dot.style.display = 'block';
                });
                
                trail[0].style.left = mouseX + 'px';
                trail[0].style.top = mouseY + 'px';
            }, 50);
            */
        }

        // ===== Mobile Detection & Optimization =====
        function optimizeForMobile() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                $('body').addClass('is-mobile');
                
                // Disable expensive animations on mobile
                $('body').addClass('reduce-motion');
                
                // Load smaller images
                $('img[data-mobile-src]').each(function() {
                    $(this).attr('src', $(this).data('mobile-src'));
                });
                
                // Disable cursor trail on mobile
                return;
            }
            
            // Desktop-only features
            initCursorTrail();
            initCardTilt();
        }

        // ===== Initialize All Visual Effects =====
        initParallax();
        initDarkMode();
        initStickyCTA();
        initScrollAnimations();
        showSkeletonLoading();
        initHeroParallax();
        optimizeForMobile();
        
        // Add stagger-fade class to elements that should animate in
        $('.feature-card, .service-card, section').addClass('stagger-fade');
        
        console.log('✨ Visual effects initialized');
    });

})(jQuery);



