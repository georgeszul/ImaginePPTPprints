/**
 * Performance Optimizations
 * Lazy loading, service worker, caching, video optimization
 */

(function() {
    'use strict';

    // ===== Service Worker DISABLED =====
    // Service worker disabled to ensure website stops when Apache stops
    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', () => {
    //         navigator.serviceWorker.register('/ImaginePPTPprints/service-worker.js')
    //             .then(reg => console.log('Service Worker: Registered', reg))
    //             .catch(err => console.log('Service Worker: Error', err));
    //     });
    // }

    // ===== Page Progress Bar =====
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'page-progress';
        progressBar.style.width = '0%';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ===== Advanced Lazy Loading =====
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const lazyVideos = document.querySelectorAll('video[data-src]');
        const lazyIframes = document.querySelectorAll('iframe[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Load image
                    if (element.tagName === 'IMG') {
                        element.src = element.dataset.src;
                        if (element.dataset.srcset) {
                            element.srcset = element.dataset.srcset;
                        }
                        element.classList.add('loaded');
                    }
                    
                    // Load video
                    if (element.tagName === 'VIDEO') {
                        const sources = element.querySelectorAll('source[data-src]');
                        sources.forEach(source => {
                            source.src = source.dataset.src;
                        });
                        element.load();
                    }
                    
                    // Load iframe
                    if (element.tagName === 'IFRAME') {
                        element.src = element.dataset.src;
                    }
                    
                    element.removeAttribute('data-src');
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before entering viewport
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
        lazyVideos.forEach(video => imageObserver.observe(video));
        lazyIframes.forEach(iframe => imageObserver.observe(iframe));
    }

    // ===== Video Optimization =====
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Only autoplay when in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.paused) {
                            video.play().catch(err => console.log('Video autoplay prevented'));
                        }
                    } else {
                        if (!video.paused) {
                            video.pause();
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            videoObserver.observe(video);
            
            // Pause video when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    video.pause();
                } else {
                    if (isInViewport(video)) {
                        video.play().catch(err => console.log('Video play prevented'));
                    }
                }
            });
        });
    }

    // ===== Check if element is in viewport =====
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== Defer Non-Critical JavaScript =====
    function loadDeferredScripts() {
        const deferredScripts = document.querySelectorAll('script[data-defer]');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                deferredScripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.dataset.defer;
                    document.body.appendChild(newScript);
                });
            }, 1000);
        });
    }

    // ===== Preload Key Resources =====
    function preloadResources() {
        const criticalImages = [
            '/ImaginePPTPprints/images/mainLogo.jpg',
            '/ImaginePPTPprints/images/favicon.svg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // ===== LocalStorage Caching =====
    const LocalCache = {
        set: function(key, data, expiryMinutes = 60) {
            const item = {
                data: data,
                expiry: new Date().getTime() + (expiryMinutes * 60 * 1000)
            };
            localStorage.setItem(key, JSON.stringify(item));
        },
        
        get: function(key) {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            const now = new Date().getTime();
            
            if (now > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            
            return item.data;
        },
        
        remove: function(key) {
            localStorage.removeItem(key);
        },
        
        clear: function() {
            localStorage.clear();
        }
    };

    // ===== Reduce HTTP Requests - Combine Images =====
    function createImageSprite() {
        // Cache common icons as data URLs
        const commonIcons = {
            phone: 'data:image/svg+xml;base64,...',
            email: 'data:image/svg+xml;base64,...',
            location: 'data:image/svg+xml;base64,...'
        };
        
        return commonIcons;
    }

    // ===== Network Speed Detection =====
    function detectConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const effectiveType = connection.effectiveType;
            
            // Adjust quality based on connection
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                document.body.classList.add('slow-connection');
                // Load lower quality images
            } else if (effectiveType === '3g') {
                document.body.classList.add('medium-connection');
            } else {
                document.body.classList.add('fast-connection');
            }
        }
    }

    // ===== Critical CSS Loader =====
    function loadNonCriticalCSS() {
        const stylesheets = document.querySelectorAll('link[data-defer-css]');
        
        window.addEventListener('load', () => {
            stylesheets.forEach(link => {
                link.rel = 'stylesheet';
                link.media = 'all';
            });
        });
    }

    // ===== Resource Hints =====
    function addResourceHints() {
        const hints = [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
            { rel: 'dns-prefetch', href: 'https://www.google.com' },
            { rel: 'dns-prefetch', href: 'https://api.resend.com' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = '';
            document.head.appendChild(link);
        });
    }

    // ===== Performance Monitoring =====
    function logPerformanceMetrics() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Log page load time
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                
                // Fix negative values by checking if timing is valid
                const validPageLoadTime = pageLoadTime > 0 ? pageLoadTime : 0;
                const validConnectTime = connectTime > 0 ? connectTime : 0;
                
                console.log('Performance Metrics:');
                console.log('Page Load Time:', (validPageLoadTime / 1000).toFixed(2) + 's');
                console.log('Server Response Time:', (validConnectTime / 1000).toFixed(2) + 's');
                
                // Log to analytics (optional)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_performance', {
                        'page_load_time': pageLoadTime,
                        'server_response_time': connectTime
                    });
                }
            });
            
            // Observe Largest Contentful Paint
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    // ===== Initialize All Performance Features =====
    document.addEventListener('DOMContentLoaded', () => {
        createProgressBar();
        detectConnectionSpeed();
        loadNonCriticalCSS();
        addResourceHints();
        
        // Small delay to prioritize critical rendering
        setTimeout(() => {
            initLazyLoading();
            optimizeVideos();
            loadDeferredScripts();
        }, 100);
    });

    // Log performance metrics
    logPerformanceMetrics();

    // Export for use in other scripts
    window.LocalCache = LocalCache;
    window.performanceUtils = {
        isInViewport,
        preloadResources
    };

})();



