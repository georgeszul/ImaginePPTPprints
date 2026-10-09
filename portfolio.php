<?php
require_once 'config.php';
$page_title = $page_titles['portfolio'];
$page_description = "View our portfolio of custom printing projects including shirts, hoodies, hats, banners, and business cards.";
include 'includes/header.php';
?>

<style>
    /* Portfolio Page Specific Styles */
    .portfolio-hero {
        background: transparent !important;
        text-align: center;
        padding: 4rem 0;
    }

    .portfolio-content {
        padding: 4rem 0;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .portfolio-item {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .portfolio-item:hover {
        transform: translateY(-5px);
    }

    .portfolio-item img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

    .category-filter {
        display: inline-flex;
        gap: 1rem;
        margin: 2rem 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    .category-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
    }

    .category-btn:hover,
    .category-btn.active {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        .portfolio-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<section class="portfolio-hero">
    <div class="container">
        <h1>Our Portfolio</h1>
        <p>Explore our collection of custom printing projects and see the quality of our work</p>
    </div>
</section>

<section class="portfolio-content">
    <div class="container">
        <div class="portfolio-categories">
            <div class="category-filter">
                <button class="category-btn active" data-category="all">All Projects</button>
                <button class="category-btn" data-category="shirts">Custom Shirts</button>
                <button class="category-btn" data-category="hoodies">Custom Hoodies</button>
                <button class="category-btn" data-category="hats">Custom Hats</button>
                <button class="category-btn" data-category="banners">Banners</button>
                <button class="category-btn" data-category="business-cards">Business Cards</button>
            </div>
        </div>

        <div class="portfolio-grid">
            <div class="portfolio-item" data-category="shirts">
                <img src="images/shirts/540748072_122202402434293236_537020029792240004_n.jpg" alt="Custom Team Shirts">
                <h3>Custom Team Shirts</h3>
                <p>Professional team uniforms with custom designs and numbering for local sports league.</p>
            </div>

            <div class="portfolio-item" data-category="hoodies">
                <img src="images/hoodies/539634838_122202397106293236_2065046746168162236_n.jpg" alt="Company Hoodies">
                <h3>Company Branding Hoodies</h3>
                <p>Custom hoodies for corporate events with company logos and professional embroidery.</p>
            </div>

            <div class="portfolio-item" data-category="banners">
                <img src="images/banner/526524609_122198365964293236_9110283145285838337_n.jpg" alt="Event Banners">
                <h3>Event Banners</h3>
                <p>Large format banners for events and business promotions with weather-resistant material.</p>
            </div>

            <div class="portfolio-item" data-category="business-cards">
                <img src="images/business cards/527979919_122199178190293236_5235865814956008456_n.jpg" alt="Business Cards">
                <h3>Professional Business Cards</h3>
                <p>High-quality business cards with custom designs and premium card stock.</p>
            </div>

            <div class="portfolio-item" data-category="shirts">
                <img src="images/shirts/539738239_122202396998293236_2183067847999368314_n.jpg" alt="Event T-Shirts">
                <h3>Event T-Shirts</h3>
                <p>Custom printed shirts for special events and celebrations with unique designs.</p>
            </div>

            <div class="portfolio-item" data-category="stickers">
                <img src="images/stickers_/imgi_60_527334183_122198365886293236_6336333727270942028_n.jpeg" alt="Custom Stickers">
                <h3>Custom Stickers & Decals</h3>
                <p>Vinyl stickers and decals for branding, vehicles, and promotional materials.</p>
            </div>
        </div>
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


