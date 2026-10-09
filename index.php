<?php
require_once 'config.php';
$page_title = $page_titles['index'];
$page_description = "Imagine PPTP Prints - Your trusted partner for high-quality printing services. From business cards to large format prints, we deliver excellence.";
include 'includes/header.php';
?>

<style>
    /* Home Page Specific Styles */
    
    /* Apple-Style Two-Row Infinite Marquee */
    .work-marquee {
        padding: 6rem 0;
        overflow: hidden;
        background: transparent !important;
        position: relative;
        z-index: 1001;
    }

    .work-marquee .section-title {
        text-align: center;
        margin-bottom: 3rem;
        color: white !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
        font-size: 2.5rem;
        font-weight: 600;
    }

    .marquee-container {
        max-width: 100%;
        margin: 0 auto;
    }

    .marquee-wrapper {
        overflow: hidden;
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
    }

    /* Second row wrapper with offset */
    .marquee-wrapper-2 {
        margin-top: 20px;
    }

    .marquee-content {
        display: flex;
        width: fit-content;
    }

    /* First row - scrolls left to right */
    .marquee-row-1 {
        animation: marquee-ltr 40s linear infinite;
    }

    /* Second row - scrolls right to left (opposite) and starts offset */
    .marquee-row-2 {
        animation: marquee-rtl 45s linear infinite;
        transform: translateX(-200px); /* Offset to create stagger */
    }

    .marquee-content:hover {
        animation-play-state: paused;
    }

    .marquee-item {
        flex: 0 0 auto;
        width: 400px;
        height: 300px;
        margin: 0 20px;
        border-radius: 16px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .marquee-item:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .marquee-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
    }

    .marquee-item:hover img {
        transform: scale(1.1);
    }

    /* Animation for first row (left to right) */
    @keyframes marquee-ltr {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    /* Animation for second row (right to left) */
    @keyframes marquee-rtl {
        0% {
            transform: translateX(-50%);
        }
        100% {
            transform: translateX(0);
        }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .marquee-item {
            width: 300px;
            height: 225px;
            margin: 0 15px;
        }

        .work-marquee .section-title {
            font-size: 2rem;
        }

        .marquee-row-1 {
            animation: marquee-ltr 30s linear infinite;
        }

        .marquee-row-2 {
            animation: marquee-rtl 35s linear infinite;
            transform: translateX(-150px);
        }

        .marquee-wrapper {
            margin-bottom: 15px;
        }

        .marquee-wrapper-2 {
            margin-top: 15px;
        }
    }

    @media (max-width: 480px) {
        .marquee-item {
            width: 250px;
            height: 187px;
            margin: 0 10px;
        }

        .work-marquee {
            padding: 4rem 0;
        }

        .marquee-row-1 {
            animation: marquee-ltr 25s linear infinite;
        }

        .marquee-row-2 {
            animation: marquee-rtl 30s linear infinite;
            transform: translateX(-100px);
        }

        .marquee-wrapper {
            margin-bottom: 10px;
        }

        .marquee-wrapper-2 {
            margin-top: 10px;
        }
    }

</style>

<section class="hero">
    <div class="hero-content">
        <h1 class="hero-title">Transform Your Brand with Custom Printed Apparel</h1>
        <p class="hero-subtitle-main">From Design to Delivery in 24-48 Hours | 100% Satisfaction Guaranteed</p>
        
        <!-- Trust Badges -->
        <div class="trust-badges">
            <div class="trust-badge">
                <span class="badge-icon">⚡</span>
                <span class="badge-text">24-48hr Turnaround</span>
            </div>
            <div class="trust-badge">
                <span class="badge-icon">✅</span>
                <span class="badge-text">100% Satisfaction</span>
            </div>
            <div class="trust-badge">
                <span class="badge-icon">🌎</span>
                <span class="badge-text">¡Hablamos Español!</span>
            </div>
        </div>
        
        <!-- Prominent Phone Number -->
        <div class="hero-contact">
            <a href="tel:<?php echo SITE_PHONE_LINK; ?>" class="hero-phone">
                📞 Call Now: <?php echo SITE_PHONE; ?>
            </a>
            <span class="hero-contact-divider">or</span>
            <a href="https://wa.me/<?php echo str_replace(['(', ')', '-', ' '], '', SITE_PHONE); ?>" class="hero-whatsapp" target="_blank">
                💬 Text on WhatsApp
            </a>
        </div>
        
        <div class="hero-buttons">
            <a href="contact.php" class="btn btn-primary btn-large">Get Free Quote →</a>
            <a href="#work-showcase" class="btn btn-secondary btn-large">See Our Work</a>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
            <span>↓</span>
            <p>Discover Our Services</p>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <h2 class="section-title">Why Choose <?php echo SITE_NAME; ?>?</h2>
        <p class="section-subtitle">Hablamos español</p>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">👕</div>
                <h3>Custom Shirts</h3>
                <p>High quality printed shirts for businesses and special occasions</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🧥</div>
                <h3>Custom Hoodies</h3>
                <p>Personalized hoodies with your design, perfect for teams and events</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🧢</div>
                <h3>Custom Hats</h3>
                <p>Professional hats and caps with your branding or custom designs</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>Design to Print</h3>
                <p>Send us your design, we'll handle the rest with quality results</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🏷️</div>
                <h3>Custom Banners</h3>
                <p>Professional banners and signage for events and businesses</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💼</div>
                <h3>Business Cards</h3>
                <p>High-quality business cards to make your first impression count</p>
            </div>
        </div>
    </div>
</section>

<!-- How It Works Section -->
<section class="how-it-works">
    <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Get your custom apparel in 3 simple steps</p>
        
        <div class="steps-grid">
            <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-icon">📤</div>
                <h3>Send Your Design</h3>
                <p>Upload your artwork or work with us to create one. We accept all file formats!</p>
            </div>
            
            <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-icon">👕</div>
                <h3>Choose Your Products</h3>
                <p>Select from shirts, hoodies, hats, banners, and more. We'll help you pick the perfect items.</p>
            </div>
            
            <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Receive your high-quality custom products in 24-48 hours. Rush orders available!</p>
            </div>
        </div>
        
        <div class="cta-center">
            <a href="contact.php" class="btn btn-primary btn-large">Start Your Order Now →</a>
        </div>
    </div>
</section>

<!-- Apple-Style Two-Row Infinite Marquee -->
<section class="work-marquee" id="work-showcase">
    <div class="marquee-container">
        <h2 class="section-title">Featured Work</h2>
        
        <!-- First Row - Scrolls Left to Right -->
        <div class="marquee-wrapper">
            <div class="marquee-content marquee-row-1">
                <!-- Row 1 unique images -->
                <div class="marquee-item">
                    <img src="images/shirts/540748072_122202402434293236_537020029792240004_n.jpg" alt="Custom Shirt Design">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539738239_122202396998293236_2183067847999368314_n.jpg" alt="Custom Shirt">
                </div>
                <div class="marquee-item">
                    <img src="images/hoodies/539634838_122202397106293236_2065046746168162236_n.jpg" alt="Custom Hoodie">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/527979919_122199178190293236_5235865814956008456_n.jpg" alt="Business Cards">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539786646_122202402428293236_5026657620272618721_n.jpg" alt="Custom Design">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/539586768_122202396788293236_2819796790172946060_n.jpg" alt="Professional Business Cards">
                </div>
                
                <!-- Duplicate set for seamless loop -->
                <div class="marquee-item">
                    <img src="images/shirts/540748072_122202402434293236_537020029792240004_n.jpg" alt="Custom Shirt Design">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539738239_122202396998293236_2183067847999368314_n.jpg" alt="Custom Shirt">
                </div>
                <div class="marquee-item">
                    <img src="images/hoodies/539634838_122202397106293236_2065046746168162236_n.jpg" alt="Custom Hoodie">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/527979919_122199178190293236_5235865814956008456_n.jpg" alt="Business Cards">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539786646_122202402428293236_5026657620272618721_n.jpg" alt="Custom Design">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/539586768_122202396788293236_2819796790172946060_n.jpg" alt="Professional Business Cards">
                </div>
            </div>
        </div>
        
        <!-- Second Row - Scrolls Right to Left (opposite direction) -->
        <div class="marquee-wrapper marquee-wrapper-2">
            <div class="marquee-content marquee-row-2">
                <!-- Row 2 unique images - all different from row 1 -->
                <div class="marquee-item">
                    <img src="images/banner/526524609_122198365964293236_9110283145285838337_n.jpg" alt="Custom Banner">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539565489_122202397124293236_5997368702485755997_n.jpg" alt="Team Shirts">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/528687307_122199178244293236_2834460709636963266_n.jpg" alt="Professional Cards">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539482495_122202397040293236_152716096225770613_n.jpg" alt="Event Shirts">
                </div>
                <div class="marquee-item">
                    <img src="images/stickers_/imgi_60_527334183_122198365886293236_6336333727270942028_n.jpeg" alt="Custom Stickers">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/529234045_122199178148293236_8808661976772103967_n.jpg" alt="Premium Cards">
                </div>
                
                <!-- Duplicate set for seamless loop -->
                <div class="marquee-item">
                    <img src="images/banner/526524609_122198365964293236_9110283145285838337_n.jpg" alt="Custom Banner">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539565489_122202397124293236_5997368702485755997_n.jpg" alt="Team Shirts">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/528687307_122199178244293236_2834460709636963266_n.jpg" alt="Professional Cards">
                </div>
                <div class="marquee-item">
                    <img src="images/shirts/539482495_122202397040293236_152716096225770613_n.jpg" alt="Event Shirts">
                </div>
                <div class="marquee-item">
                    <img src="images/stickers_/imgi_60_527334183_122198365886293236_6336333727270942028_n.jpeg" alt="Custom Stickers">
                </div>
                <div class="marquee-item">
                    <img src="images/business cards/529234045_122199178148293236_8808661976772103967_n.jpg" alt="Premium Cards">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Counter Section -->
<section class="stats-section">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" data-count="500">0</div>
                <div class="stat-label">Happy Customers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-count="5000">0</div>
                <div class="stat-label">Products Printed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-count="10">0</div>
                <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-count="24">0</div>
                <div class="stat-label">Hour Turnaround</div>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials">
    <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <p class="section-subtitle">Real reviews from real businesses</p>
        
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p class="testimonial-text">"Amazing quality and super fast! Got my team's shirts in 2 days. The printing is crisp and the colors are vibrant. Highly recommend!"</p>
                <div class="testimonial-author">
                    <strong>Maria G.</strong>
                    <span>Chicago Business Owner</span>
                </div>
            </div>
            
            <div class="testimonial-card">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p class="testimonial-text">"They helped design everything from scratch. Very professional and patient with all my changes. The final product exceeded expectations!"</p>
                <div class="testimonial-author">
                    <strong>John D.</strong>
                    <span>Event Coordinator</span>
                </div>
            </div>
            
            <div class="testimonial-card">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p class="testimonial-text">"Best printing service in the area! They speak Spanish which made communication so much easier. Prices are fair and quality is top-notch."</p>
                <div class="testimonial-author">
                    <strong>Carlos R.</strong>
                    <span>Restaurant Owner</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section class="faq-section">
    <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-grid">
            <div class="faq-item">
                <h3>How fast can you deliver?</h3>
                <p>Our standard turnaround is 24-48 hours from artwork approval. Rush orders can be completed even faster - contact us for same-day options!</p>
            </div>
            
            <div class="faq-item">
                <h3>Do you have minimum orders?</h3>
                <p>No minimums! Whether you need 1 shirt or 1,000, we're here to help. Small orders are welcome.</p>
            </div>
            
            <div class="faq-item">
                <h3>Can you help with design?</h3>
                <p>Absolutely! Send us your ideas, logos, or rough sketches and we'll create professional artwork for you at no extra charge.</p>
            </div>
            
            <div class="faq-item">
                <h3>What's your pricing?</h3>
                <p>Pricing varies by product, quantity, and design complexity. Contact us for a free quote - we'll beat any competitor's price!</p>
            </div>
            
            <div class="faq-item">
                <h3>What file formats do you accept?</h3>
                <p>We accept all formats: PNG, JPG, PDF, AI, PSD, and more. Don't have a design? No problem - we'll create one for you!</p>
            </div>
            
            <div class="faq-item">
                <h3>Do you offer guarantees?</h3>
                <p>Yes! 100% satisfaction guaranteed. If you're not happy with the quality, we'll remake it or refund you. No questions asked.</p>
            </div>
        </div>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2>Ready to Start Your Project?</h2>
        <p>Get your free quote today - no commitment required!</p>
        <p class="cta-highlight">🎉 First-time customers get 10% OFF with code: FIRST10</p>
        <div class="cta-buttons">
            <a href="tel:<?php echo SITE_PHONE_LINK; ?>" class="btn-cta-primary">📞 Call Now</a>
            <a href="mailto:<?php echo SITE_EMAIL; ?>" class="btn-cta-secondary">📧 Send Email</a>
            <a href="<?php echo WHATSAPP_URL; ?>" class="btn-cta-secondary" target="_blank">💬 WhatsApp</a>
        </div>
    </div>
</section>


<?php include 'includes/footer.php'; ?>


