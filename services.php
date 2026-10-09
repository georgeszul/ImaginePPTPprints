<?php
require_once 'config.php';
$page_title = $page_titles['services'];
$page_description = "Explore our comprehensive printing services including custom shirts, hoodies, hats, banners, business cards, and more.";
include 'includes/header.php';
?>

<style>
    /* Services Page Specific Styles */
    .service-item, .how-it-works, .pricing-info, .pricing-calculator-section, .faq-section, .testimonials-section, .materials-sizing-section {
        background: transparent !important;
    }
    
    .product-card, .pricing-card, .testimonial-card, .faq-item, .material-swatches, .size-charts {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
        padding: 2rem !important;
    }
</style>

<section class="page-header">
    <div class="container">
        <h1>Our Services</h1>
        <p>Custom printed apparel and accessories for businesses and special occasions</p>
    </div>
</section>

<section class="services-detailed">
    <div class="container">
        <div class="service-item" id="custom-shirts">
            <div class="service-content">
                <div class="service-text">
                    <h2>Custom Shirts</h2>
                    <p>High quality printed shirts perfect for businesses, teams, and special occasions. We offer:</p>
                    <ul>
                        <li>Custom t-shirt printing with premium materials</li>
                        <li>Business logo shirts for company branding</li>
                        <li>Team uniforms and sports shirts</li>
                        <li>Event and celebration shirts</li>
                        <li>Screen printing, embroidery, and heat transfer options</li>
                        <li>Various styles: crew neck, v-neck, long sleeve</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="service-item" id="custom-hoodies">
            <div class="service-content">
                <div class="service-text">
                    <h2>Custom Hoodies</h2>
                    <p>Personalized hoodies perfect for teams, events, and branding. We offer:</p>
                    <ul>
                        <li>Custom hoodie printing with premium fabrics</li>
                        <li>Team and company hoodies for branding</li>
                        <li>Event and celebration hoodies</li>
                        <li>Pullover and zip-up hoodie styles</li>
                        <li>Screen printing, embroidery, and heat transfer</li>
                        <li>Available in various colors and sizes</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="service-item" id="custom-hats">
            <div class="service-content">
                <div class="service-text">
                    <h2>Custom Hats</h2>
                    <p>Professional hats and caps with your custom design or branding. We offer:</p>
                    <ul>
                        <li>Custom hat embroidery and printing</li>
                        <li>Business logo hats for company branding</li>
                        <li>Team and sports hats</li>
                        <li>Event and promotional hats</li>
                        <li>Baseball caps, trucker hats, beanies</li>
                        <li>High-quality embroidery and screen printing</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="service-item" id="custom-banners">
            <div class="service-content">
                <div class="service-text">
                    <h2>Custom Banners & Large Format</h2>
                    <p>Professional banners and large format printing for events and businesses. We offer:</p>
                    <ul>
                        <li>Weather-resistant vinyl banners for outdoor use</li>
                        <li>Premium fabric banners for indoor displays</li>
                        <li>Large format printing up to 10ft wide</li>
                        <li>Professional installation services</li>
                        <li>Custom sizing and material options</li>
                        <li>Fast turnaround for event deadlines</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="service-item" id="business-cards">
            <div class="service-content">
                <div class="service-text">
                    <h2>Business Cards</h2>
                    <p>High-quality business cards with custom designs. Various finishes available.</p>
                    <ul>
                        <li>Premium card stock options</li>
                        <li>Custom sizes and shapes</li>
                        <li>Matte, glossy, and semi-gloss finishes</li>
                        <li>Full-color printing</li>
                        <li>Fast turnaround</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Price Calculator Section -->
<section class="price-calculator-section">
    <div class="container">
        <h2 class="section-title">💰 Instant Price Calculator</h2>
        <p class="section-subtitle">Get an estimate for your custom order in seconds</p>
        
        <div class="calculator-container">
            <div class="calculator-form">
                <div class="calc-group">
                    <label for="productType">Product Type</label>
                    <select id="productType" class="calc-input">
                        <option value="tshirt">T-Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="hat">Hat/Cap</option>
                        <option value="banner">Banner</option>
                        <option value="businesscard">Business Cards</option>
                        <option value="sticker">Stickers</option>
                    </select>
                </div>

                <div class="calc-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" class="calc-input" value="10" min="1" max="10000">
                    <small class="calc-hint">No minimums! Order 1 or 1,000+</small>
                </div>

                <div class="calc-group">
                    <label for="printMethod">Print Method</label>
                    <select id="printMethod" class="calc-input">
                        <option value="screen">Screen Printing</option>
                        <option value="dtg">Direct to Garment (DTG)</option>
                        <option value="embroidery">Embroidery</option>
                        <option value="heat">Heat Transfer</option>
                        <option value="vinyl">Vinyl Print</option>
                    </select>
                </div>

                <div class="calc-group">
                    <label for="colors">Number of Colors</label>
                    <select id="colors" class="calc-input">
                        <option value="1">1 Color</option>
                        <option value="2">2 Colors</option>
                        <option value="3">3 Colors</option>
                        <option value="4">4+ Colors (Full Color)</option>
                    </select>
                </div>

                <div class="calc-group">
                    <label for="turnaround">Turnaround Time</label>
                    <select id="turnaround" class="calc-input">
                        <option value="standard">Standard (24-48 hrs)</option>
                        <option value="rush">Rush (Same Day) +30%</option>
                        <option value="extended">Extended (3-5 days) -10%</option>
                    </select>
                </div>

                <div class="calc-group checkbox-group">
                    <label>
                        <input type="checkbox" id="designHelp" class="calc-checkbox">
                        Need design help? (FREE)
                    </label>
                </div>
            </div>

            <div class="calculator-results">
                <div class="results-card">
                    <h3>Your Estimate</h3>
                    
                    <div class="price-breakdown">
                        <div class="price-row">
                            <span>Base Price:</span>
                            <span id="basePrice">$0.00</span>
                        </div>
                        <div class="price-row">
                            <span>Print Method:</span>
                            <span id="printCost">$0.00</span>
                        </div>
                        <div class="price-row">
                            <span>Colors:</span>
                            <span id="colorCost">$0.00</span>
                        </div>
                        <div class="price-row turnaround-cost">
                            <span>Turnaround:</span>
                            <span id="turnaroundCost">$0.00</span>
                        </div>
                        <div class="price-divider"></div>
                        <div class="price-row total">
                            <span>Total Estimate:</span>
                            <span id="totalPrice">$0.00</span>
                        </div>
                        <div class="price-row per-unit">
                            <span>Per Unit:</span>
                            <span id="unitPrice">$0.00</span>
                        </div>
                    </div>

                    <div class="discount-notice">
                        <p>🎉 <strong>First Order Discount:</strong> Use code <code>FIRST10</code> for 10% OFF!</p>
                    </div>

                    <div class="calculator-actions">
                        <a href="contact.php" class="btn-calc-primary">Get Official Quote</a>
                        <a href="tel:<?php echo SITE_PHONE_LINK; ?>" class="btn-calc-secondary">📞 Call Now</a>
                    </div>

                    <p class="calc-disclaimer">*Estimate only. Final price may vary based on specific requirements. Contact us for an official quote.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="how-it-works">
    <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">From design to delivery in 4 simple steps</p>
        <div class="process-steps">
            <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h3>Submit Your Design</h3>
                    <p>Send us your logo, artwork, or design concept. We accept AI, EPS, PNG, and JPG files.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h3>Choose Your Products</h3>
                    <p>Select from our range of shirts, hoodies, and hats. Pick colors, sizes, and quantities.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h3>We Print & Quality Check</h3>
                    <p>Our expert team handles the printing process and performs quality control checks.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <h3>Fast Delivery</h3>
                    <p>Your custom apparel is delivered to your door in 3-7 business days.</p>
                </div>
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


