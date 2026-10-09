<?php
require_once 'config.php';
$page_title = $page_titles['about'];
$page_description = "Learn about " . SITE_NAME . " - your trusted partner for high-quality custom printing services in Elgin, IL.";
include 'includes/header.php';
?>

<style>
    /* About Page Specific Styles */
    .about-hero, .about-content, .contact-info, .hours {
        background: transparent !important;
    }

    .about-card, .contact-card, .service-card {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
        padding: 2rem !important;
        text-align: center !important;
    }

    .about-hero {
        text-align: center;
        padding: 4rem 2rem;
        color: white;
    }

    .about-hero h1 {
        color: white !important;
        margin-bottom: 1rem;
        font-size: 2.5rem;
    }

    .contact-cards {
        padding: 4rem 0;
    }

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .contact-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    }

    .contact-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
    }

    .contact-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0;
        justify-content: center;
    }

    .stars {
        color: #fbbf24;
        font-size: 1.2rem;
    }

    .services-cards {
        padding: 4rem 0;
    }

    .what-we-do-section {
        text-align: center;
        margin-bottom: 3rem;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .service-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }

    .hours {
        padding: 2rem 0;
        text-align: center;
    }

    @media (max-width: 768px) {
        .contact-grid, .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }
</style>

<section class="about-hero">
    <div class="container">
        <h1 class="hero-title">About <?php echo SITE_NAME; ?></h1>
        <p class="hero-subtitle">Your trusted partner for high-quality custom printing services in Elgin, Illinois</p>
    </div>
</section>

<section class="about-content">
    <div class="container">
        <div class="about-card">
            <h2>Our Story</h2>
            <p><?php echo SITE_NAME; ?> is your local printing service specializing in high-quality custom apparel and accessories. We serve businesses, teams, and individuals throughout the Elgin area and beyond.</p>
            <p>Our mission is to provide exceptional printing services with a focus on quality, customer satisfaction, and timely delivery. Whether you need custom shirts for your business, hoodies for your team, or hats for your special event, we've got you covered.</p>
        </div>

        <div class="what-we-do-section">
            <h2>What We Do</h2>
            <p>We specialize in custom printing services! <strong>Hablamos español</strong> - We're proud to serve our Spanish-speaking community!</p>
        </div>
    </div>
</section>

<section class="services-cards">
    <div class="container">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">👕</div>
                <h3>Custom Shirts & T-Shirts</h3>
                <p>High-quality custom printed apparel for businesses, teams, and events. Screen printing and heat transfer options available.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">🧥</div>
                <h3>Personalized Hoodies</h3>
                <p>Custom hoodies perfect for teams, events, and branding. Available in various styles, colors, and sizes.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">🎩</div>
                <h3>Custom Hats & Caps</h3>
                <p>Professional embroidered caps for business branding and promotional events. Multiple styles available.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">💼</div>
                <h3>Business Cards</h3>
                <p>High-quality business cards with custom designs. Various finishes including foil stamping and embossing.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">🏷️</div>
                <h3>Banners & Signage</h3>
                <p>Large format banners and signs for events and business promotion. Weather-resistant vinyl options.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">🏷️</div>
                <h3>Stickers & Decals</h3>
                <p>Custom vinyl stickers and decals for branding, vehicles, and promotional materials.</p>
            </div>
        </div>
    </div>
</section>

<section class="contact-cards">
    <div class="container">
        <h2 class="section-title">Contact Information</h2>
        <div class="contact-grid">
            <div class="contact-card">
                <div class="contact-icon">📍</div>
                <h3>Address</h3>
                <p><?php echo SITE_ADDRESS; ?></p>
            </div>

            <div class="contact-card">
                <div class="contact-icon">📞</div>
                <h3>Phone</h3>
                <p><a href="tel:<?php echo SITE_PHONE_LINK; ?>"><?php echo SITE_PHONE; ?></a></p>
                <p class="contact-note">Call anytime!</p>
            </div>

            <div class="contact-card">
                <div class="contact-icon">📧</div>
                <h3>Email</h3>
                <p><a href="mailto:<?php echo SITE_EMAIL; ?>"><?php echo SITE_EMAIL; ?></a></p>
                <p class="contact-note">We respond quickly!</p>
            </div>

            <div class="contact-card">
                <div class="contact-icon">🌐</div>
                <h3>Online Store</h3>
                <p><a href="<?php echo SHOPIFY_URL; ?>" target="_blank">Visit Our Shopify Store</a></p>
                <p class="contact-note">Shop 24/7</p>
            </div>

            <div class="contact-card">
                <div class="contact-icon">📱</div>
                <h3>Social Media</h3>
                <p><a href="<?php echo TIKTOK_URL; ?>" target="_blank">Follow us on TikTok</a></p>
                <p class="contact-note">See our latest work!</p>
            </div>

            <div class="contact-card">
                <div class="contact-icon">⭐</div>
                <h3>Customer Rating</h3>
                <div class="rating">
                    <div class="stars">★★★★★</div>
                    <span>Not yet rated (4 Reviews)</span>
                </div>
                <p class="contact-note">Building trust daily</p>
            </div>
        </div>
    </div>
</section>

<section class="hours">
    <div class="container">
        <h3>🕒 Business Hours</h3>
        <p>Always open - We're here when you need us!</p>
        <p>We offer delivery and contactless delivery options for your convenience.</p>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2>Ready to Start Your Project?</h2>
        <p>Any questions? Feel free to text, call, or send an email. We're here to help!</p>
        <p>¡Hablamos español!</p>
        <div class="cta-buttons">
            <a href="tel:<?php echo SITE_PHONE_LINK; ?>" class="btn-cta-primary">Call Now</a>
            <a href="mailto:<?php echo SITE_EMAIL; ?>" class="btn-cta-secondary">Send Email</a>
            <a href="<?php echo WHATSAPP_URL; ?>" class="btn-cta-secondary" target="_blank">WhatsApp</a>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>


