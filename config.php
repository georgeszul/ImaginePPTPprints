<?php
// Site Configuration
define('SITE_NAME', 'Imagine PPTP Prints');
define('SITE_TAGLINE', 'Professional Printing Solutions');
define('SITE_EMAIL', 'imaginepttp@gmail.com');
define('SITE_PHONE', '(331) 255-5330');
define('SITE_PHONE_LINK', '+13312555330');
define('SITE_ADDRESS', '840 N State St, Northeast Elgin, IL, United States, 60123');
define('SITE_ADDRESS_SHORT', '840 N State St, Northeast Elgin, IL');

// Social Media Links
define('FACEBOOK_URL', 'https://www.facebook.com/profile.php?id=61558797091752');
define('TIKTOK_URL', 'https://www.tiktok.com/t/ZP8kGeyLB/');
define('SHOPIFY_URL', 'https://68da1e-18.myshopify.com/');
define('WHATSAPP_URL', 'https://wa.me/13312555330');

// Page Titles
$page_titles = [
    'index' => 'Imagine PPTP Prints - Professional Printing Solutions',
    'about' => 'About Us - Imagine PPTP Prints',
    'services' => 'Our Services - Imagine PPTP Prints',
    'portfolio' => 'Portfolio - Imagine PPTP Prints',
    'contact' => 'Contact Us - Imagine PPTP Prints'
];

// Helper function to get current page
function getCurrentPage() {
    $page = basename($_SERVER['PHP_SELF'], '.php');
    return $page;
}

// Helper function to check if current page is active
function isActive($page) {
    return getCurrentPage() === $page ? 'active' : '';
}
?>



