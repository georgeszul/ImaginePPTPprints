<?php
if (!defined('SITE_NAME')) {
    require_once __DIR__ . '/../config.php';
}
$current_page = getCurrentPage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title : $page_titles[$current_page]; ?></title>
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : SITE_NAME . ' - ' . SITE_TAGLINE; ?>">
    <!-- Preconnect to external domains for faster loading -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://code.jquery.com" crossorigin>
    <link rel="dns-prefetch" href="https://code.jquery.com">
    <link rel="preconnect" href="https://www.google.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google.com">
    <link rel="preconnect" href="https://www.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="css/main.css" as="style">
    <link rel="preload" href="images/mainLogo.jpg" as="image">
    <!-- jQuery preload removed to fix integrity mismatch warning -->
    
    <!-- Critical CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="assets/css/enhanced.css">
    <link rel="stylesheet" href="assets/css/minimal-fix.css">
    <link rel="stylesheet" href="assets/css/landing-enhancements.css">
    <link rel="stylesheet" href="assets/css/ai-chat-widget.css">
    <link rel="stylesheet" href="assets/css/price-calculator.css">
    <!-- <link rel="stylesheet" href="assets/css/visual-enhancements.css"> -->
    <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    
    <!-- Google reCAPTCHA v3 -->
    <script src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></script>
    
    <?php // include __DIR__ . '/styles.php'; ?>
</head>
<body>
    <!-- Paint Splat Background Video -->
    <video autoplay muted playsinline loop id="paint-splat-bg">
        <source src="4508057-uhd_3840_2160_25fps.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.php" class="logo-link">
                        <img src="images/mainLogo.jpg" alt="<?php echo SITE_NAME; ?> Logo" class="logo-image">
                        <h1><?php echo SITE_NAME; ?></h1>
                    </a>
                </div>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="index.php" class="nav-link <?php echo isActive('index'); ?>">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="services.php" class="nav-link <?php echo isActive('services'); ?>">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="portfolio.php" class="nav-link <?php echo isActive('portfolio'); ?>">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a href="about.php" class="nav-link <?php echo isActive('about'); ?>">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.php" class="nav-link <?php echo isActive('contact'); ?>">Contact</a>
                    </li>
                </ul>
                
                <div class="nav-actions">
                    <div class="search-container">
                        <button class="search-toggle" aria-label="Toggle search">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <div class="search-dropdown">
                            <form class="search-form" role="search">
                                <input type="search" class="search-input" placeholder="Search services..." aria-label="Search">
                                <button type="submit" class="search-submit" aria-label="Submit search">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <a href="contact.php" class="btn btn-quote">Get Quote</a>
                </div>
                
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    </header>

    <main>


