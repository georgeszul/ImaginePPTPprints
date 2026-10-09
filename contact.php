<?php
require_once 'config.php';
$page_title = $page_titles['contact'];
$page_description = "Contact " . SITE_NAME . " for custom printing services. High quality shirts, hoodies, hats, banners, and business cards. Located in Elgin, IL.";
include 'includes/header.php';
?>

<style>
    /* Contact Page Specific Styles */
    .contact-hero {
        background: transparent !important;
        color: white;
        text-align: center;
        padding: 4rem 2rem;
    }

    .contact-form {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.95);
        color: #000000 !important;
    }

    .info-panel {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }
</style>

<section class="contact-hero">
    <div class="container">
        <h1>Contact Us</h1>
        <p>High Quality printed shirts, hoodies, hats, for businesses, special occasions you name it.</p>
        <p>Send us your design we will make the rest. Any questions feel free to text, call or send an email.</p>
        <div class="spanish-note">
            <p>¡Hablamos español!</p>
        </div>
    </div>
</section>

<section class="contact-content">
    <div class="contact-grid">
        <!-- Contact Form Section -->
                <div class="contact-form-section">
                    <h2>Get In Touch</h2>
                    
                    <!-- Response Message -->
                    <div id="form-response-message"></div>
                    
                    <form class="contact-form" id="contact-form" method="POST">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="Full Name">
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="Email Address">
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number">
                </div>

                <div class="form-group">
                    <label for="service">Service Interested In</label>
                    <select id="service" name="service">
                        <option value="">Select a service</option>
                        <option value="custom-shirts">Custom Shirts</option>
                        <option value="custom-hoodies">Custom Hoodies</option>
                        <option value="custom-hats">Custom Hats</option>
                        <option value="custom-banners">Custom Banners</option>
                        <option value="business-cards">Business Cards</option>
                        <option value="stickers">Stickers</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message">Project Details</label>
                    <textarea id="message" name="message" rows="4" placeholder="Tell us about your project..."></textarea>
                </div>
                
                <button type="submit" class="send-quote-btn">Send Quote Request</button>
            </form>
        </div>

        <!-- Contact Info Section -->
        <div class="contact-info-section">
            <h2>Contact Information</h2>
            <div class="info-panel">
                <div class="contact-info-list">
                    <div class="contact-info-item">
                        <span class="info-icon">📍</span>
                        <div>
                            <h5>Address</h5>
                            <p><?php echo SITE_ADDRESS; ?></p>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <span class="info-icon">📞</span>
                        <div>
                            <h5>Phone</h5>
                            <p><a href="tel:<?php echo SITE_PHONE_LINK; ?>"><?php echo SITE_PHONE; ?></a></p>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <span class="info-icon">📧</span>
                        <div>
                            <h5>Email</h5>
                            <p><a href="mailto:<?php echo SITE_EMAIL; ?>"><?php echo SITE_EMAIL; ?></a></p>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <span class="info-icon">🕒</span>
                        <div>
                            <h5>Business Hours</h5>
                            <p>Monday - Sunday<br>Always Open</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-panel">
                <h4>🚚 Delivery & Pickup</h4>
                <ul>
                    <li>Contactless delivery available</li>
                    <li>Local pickup at our Elgin location</li>
                    <li>Shipping available nationwide</li>
                </ul>
            </div>

            <div class="info-panel">
                <h4>⏰ Turnaround Times</h4>
                <ul>
                    <li>Standard: 3-5 business days</li>
                    <li>Rush: 1-2 business days</li>
                    <li>Large Orders: 5-7 business days</li>
                </ul>
            </div>

            <div class="info-panel">
                <h4>📱 Follow Us</h4>
                <div class="social-buttons">
                    <a href="<?php echo TIKTOK_URL; ?>" class="social-btn" target="_blank">TikTok</a>
                    <a href="<?php echo SHOPIFY_URL; ?>" class="social-btn" target="_blank">Shop</a>
                    <a href="<?php echo FACEBOOK_URL; ?>" class="social-btn" target="_blank">Facebook</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

