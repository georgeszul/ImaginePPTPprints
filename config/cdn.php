<?php
/**
 * CDN Configuration
 * Cloudflare CDN integration and asset optimization
 */

// CDN Configuration
define('CDN_ENABLED', false); // Set to true when using CDN
define('CDN_URL', 'https://cdn.imaginepptp.com'); // Your CDN URL
define('USE_CLOUDFLARE', false); // Enable Cloudflare optimizations

/**
 * Get asset URL (with CDN if enabled)
 */
function assetUrl($path) {
    if (CDN_ENABLED) {
        return CDN_URL . '/' . ltrim($path, '/');
    }
    return '/' . ltrim($path, '/');
}

/**
 * Generate optimized image URL
 */
function imageUrl($path, $width = null, $quality = 85) {
    $baseUrl = CDN_ENABLED ? CDN_URL : '';
    $url = $baseUrl . '/' . ltrim($path, '/');
    
    // Cloudflare Image Resizing
    if (USE_CLOUDFLARE && $width) {
        return "https://imaginepptp.com/cdn-cgi/image/width={$width},quality={$quality},format=auto/{$path}";
    }
    
    return $url;
}

/**
 * Cloudflare Cache Purge
 */
function purgeCloudflareCache($urls = []) {
    if (!USE_CLOUDFLARE) {
        return false;
    }
    
    $zoneId = 'YOUR_CLOUDFLARE_ZONE_ID';
    $apiKey = 'YOUR_CLOUDFLARE_API_KEY';
    $email = 'YOUR_CLOUDFLARE_EMAIL';
    
    $ch = curl_init();
    
    $data = empty($urls) ? ['purge_everything' => true] : ['files' => $urls];
    
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.cloudflare.com/client/v4/zones/{$zoneId}/purge_cache",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "X-Auth-Email: {$email}",
            "X-Auth-Key: {$apiKey}",
            'Content-Type: application/json'
        ],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

/**
 * Browser Caching Headers
 */
function setBrowserCacheHeaders($type = 'static') {
    switch ($type) {
        case 'static':
            // Cache static assets for 1 year
            header('Cache-Control: public, max-age=31536000, immutable');
            break;
        case 'dynamic':
            // Cache dynamic content for 1 hour
            header('Cache-Control: public, max-age=3600, must-revalidate');
            break;
        case 'no-cache':
            // Don't cache
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
            header('Pragma: no-cache');
            break;
    }
}

/**
 * Preconnect to external domains
 */
function getPreconnectDomains() {
    return [
        'https://code.jquery.com',
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://api.resend.com'
    ];
}

/**
 * Generate preconnect headers
 */
function generatePreconnectHeaders() {
    $domains = getPreconnectDomains();
    $html = '';
    
    foreach ($domains as $domain) {
        $html .= '<link rel="preconnect" href="' . $domain . '" crossorigin>' . "\n";
        $html .= '<link rel="dns-prefetch" href="' . $domain . '">' . "\n";
    }
    
    return $html;
}

/**
 * Enable GZIP Compression
 */
function enableCompression() {
    if (!headers_sent() && extension_loaded('zlib')) {
        ini_set('zlib.output_compression', 'On');
        ini_set('zlib.output_compression_level', '6');
    }
}

/**
 * Minify HTML output
 */
function minifyHTML($html) {
    // Remove comments
    $html = preg_replace('/<!--(?!<!)[^\[>].*?-->/', '', $html);
    
    // Remove whitespace
    $html = preg_replace('/\s+/', ' ', $html);
    
    // Remove whitespace around tags
    $html = preg_replace('/>\s+</', '><', $html);
    
    return trim($html);
}

/**
 * Start output buffering for compression and minification
 */
function startOptimizedOutput() {
    enableCompression();
    
    ob_start(function($buffer) {
        // Minify HTML
        $buffer = minifyHTML($buffer);
        return $buffer;
    });
}
?>




