<style>
    /* Paint Splat Background Video */
    #paint-splat-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
        transition: filter 0.8s ease-in-out;
    }

    /* Snow Animation Styles */
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        z-index: 0;
        background: radial-gradient(
            circle,
            rgb(126, 223, 255) 0%,
            rgba(71, 196, 255, 1) 68%,
            rgba(0, 110, 239, 1) 100%
        );
    }

    .loader-icon-1 {
        font-size: 80px;
        color: rgb(200, 241, 255, 0.8);
        text-shadow: 1px 1px 1px rgba(71, 196, 255, 1), -1px -1px 1px white;
        animation: snow-loader 0.5s 9 linear alternate-reverse forwards,
            snow-loader-zoom 5s forwards;
        animation-delay: 0s, 0.5s;
    }

    @keyframes snow-loader {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(90deg); }
    }

    @keyframes snow-loader-zoom {
        from {
            transform: scale(1, 1) rotateZ(0deg);
            color: rgb(200, 241, 255, 0.8);
        }
        to {
            color: #123;
            transform: scale(200, 200) rotateZ(360deg);
        }
    }

    .main {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(#123, #111);
        opacity: 0;
        animation: main-loadup 1s forwards linear, main-loadup-bg 10s forwards linear;
        animation-delay: 1s, 8s;
    }

    @keyframes main-loadup {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes main-loadup-bg {
        from {
            background-size: 100% 100%;
            background-position: 0% 0%;
        }
        to {
            background-size: 400% 400%;
            background-position: 0% 100%;
        }
    }

    .initial-snow {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        pointer-events: none;
    }

    .initial-snow > * {
        font-size: 50px;
        color: white;
        position: absolute;
        top: -5vh;
        pointer-events: none;
        z-index: 0;
    }

    @keyframes snowfall {
        0% { transform: translate3d(var(--left-ini), 0, 0); }
        100% { transform: translate3d(var(--left-end), 100vh, 0); }
    }

    /* Snow elements */
    .snow:nth-child(2n) { filter: blur(1px); font-size: 40px; }
    .snow:nth-child(6n) { filter: blur(2px); font-size: 30px; }
    .snow:nth-child(10n) { filter: blur(5px); font-size: 30px; }

    /* Individual snow animations */
    .snow:nth-child(1) { --size: 0.8vw; --left-ini: 0vw; --left-end: -1vw; left: 70vw; animation: snowfall 9s linear infinite; animation-delay: -1s; }
    .snow:nth-child(2) { --size: 0.2vw; --left-ini: -7vw; --left-end: 10vw; left: 65vw; animation: snowfall 15s linear infinite; animation-delay: -8s; }
    .snow:nth-child(3) { --size: 1vw; --left-ini: 6vw; --left-end: 6vw; left: 1vw; animation: snowfall 9s linear infinite; animation-delay: -7s; }
    .snow:nth-child(4) { --size: 0.2vw; --left-ini: -3vw; --left-end: 9vw; left: 80vw; animation: snowfall 14s linear infinite; animation-delay: -5s; }
    .snow:nth-child(5) { --size: 0.4vw; --left-ini: -2vw; --left-end: -9vw; left: 74vw; animation: snowfall 6s linear infinite; animation-delay: -4s; }
    .snow:nth-child(6) { --size: 0.6vw; --left-ini: 4vw; --left-end: 2vw; left: 15vw; animation: snowfall 12s linear infinite; animation-delay: -3s; }
    .snow:nth-child(7) { --size: 0.3vw; --left-ini: -5vw; --left-end: 7vw; left: 45vw; animation: snowfall 8s linear infinite; animation-delay: -6s; }
    .snow:nth-child(8) { --size: 0.9vw; --left-ini: 3vw; --left-end: -4vw; left: 25vw; animation: snowfall 11s linear infinite; animation-delay: -2s; }
    .snow:nth-child(9) { --size: 0.1vw; --left-ini: -8vw; --left-end: 5vw; left: 75vw; animation: snowfall 16s linear infinite; animation-delay: -9s; }
    .snow:nth-child(10) { --size: 0.7vw; --left-ini: 2vw; --left-end: -6vw; left: 35vw; animation: snowfall 10s linear infinite; animation-delay: -1.5s; }
    .snow:nth-child(11) { --size: 0.5vw; --left-ini: -4vw; --left-end: 8vw; left: 55vw; animation: snowfall 13s linear infinite; animation-delay: -7.5s; }
    .snow:nth-child(12) { --size: 0.8vw; --left-ini: 7vw; --left-end: -3vw; left: 5vw; animation: snowfall 9s linear infinite; animation-delay: -4.5s; }
    .snow:nth-child(13) { --size: 0.2vw; --left-ini: -6vw; --left-end: 6vw; left: 60vw; animation: snowfall 15s linear infinite; animation-delay: -8.5s; }
    .snow:nth-child(14) { --size: 0.4vw; --left-ini: 1vw; --left-end: -7vw; left: 85vw; animation: snowfall 7s linear infinite; animation-delay: -3.5s; }
    .snow:nth-child(15) { --size: 0.6vw; --left-ini: -2vw; --left-end: 9vw; left: 40vw; animation: snowfall 12s linear infinite; animation-delay: -6.5s; }
    .snow:nth-child(16) { --size: 0.3vw; --left-ini: 8vw; --left-end: -5vw; left: 20vw; animation: snowfall 8s linear infinite; animation-delay: -2.5s; }
    .snow:nth-child(17) { --size: 0.9vw; --left-ini: -1vw; --left-end: 4vw; left: 50vw; animation: snowfall 11s linear infinite; animation-delay: -7.8s; }
    .snow:nth-child(18) { --size: 0.1vw; --left-ini: 5vw; --left-end: -8vw; left: 30vw; animation: snowfall 16s linear infinite; animation-delay: -4.2s; }
    .snow:nth-child(19) { --size: 0.7vw; --left-ini: -3vw; --left-end: 7vw; left: 10vw; animation: snowfall 10s linear infinite; animation-delay: -9.1s; }
    .snow:nth-child(20) { --size: 0.5vw; --left-ini: 6vw; --left-end: -2vw; left: 90vw; animation: snowfall 13s linear infinite; animation-delay: -5.7s; }

    /* Ensure page content appears above snow animation */
    .header, .hero, .features, .services-preview, .gallery, .cta, .footer, main, section {
        position: relative;
        z-index: 1001;
    }

    /* Ensure snow animation stays behind content */
    .loader, .main {
        pointer-events: none;
        z-index: 0;
    }

    .loader *, .main * {
        pointer-events: none;
    }

    /* Make navigation bar sticky */
    .header {
        position: sticky !important;
        top: 0 !important;
        z-index: 1002 !important;
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
    }

    /* Ensure nav text is readable */
    .nav-logo h1, .nav-link {
        color: #1f2937 !important;
        text-shadow: none !important;
    }

    .nav-link:hover, .nav-link.active {
        color: #2563eb !important;
    }

    /* Make sure text is readable */
    .hero-title, .hero-subtitle, .section-title, .section-subtitle,
    h1, h2, h3, h4, h5, h6, p, span, label {
        color: white !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
    }

    /* Make all sections transparent */
    .hero, .features, .services-preview, .gallery, .cta, .footer,
    .page-header, .contact-content, .contact-grid, .contact-form-section,
    .feature-card, .service-card, .gallery-item, .product-card {
        background: transparent !important;
        background-color: transparent !important;
    }

    /* Frosted glass effect for cards */
    .feature-card, .service-card, .product-card {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
    }

    /* Card text styling */
    .feature-card h3, .service-card h3, .product-card h3,
    .feature-card p, .service-card p, .product-card p {
        color: white !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
        font-weight: 700 !important;
    }

    /* Button styling */
    .btn-primary, .btn-secondary {
        background: rgba(255, 255, 255, 0.9) !important;
        color: #1f2937 !important;
        text-shadow: none !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }

    /* CTA and Footer sections */
    .cta {
        background: rgba(31, 41, 55, 0.8) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }

    .footer {
        background: rgba(31, 41, 55, 0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
    }

    .footer-section {
        background: transparent !important;
        backdrop-filter: none !important;
        border: none !important;
        box-shadow: none !important;
    }

    /* Footer text */
    .footer-section h3, .footer-section h4, .footer-section p, .footer-section a {
        color: white !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
        font-weight: 600 !important;
    }

    .footer-section a:hover {
        color: #60a5fa !important;
    }

    .footer-bottom {
        background: transparent !important;
        backdrop-filter: none !important;
        border-top: none !important;
    }
</style>


