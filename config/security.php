<?php
/**
 * Security Configuration
 * CAPTCHA, CSRF Protection, Rate Limiting
 */

// Session configuration for security
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', 0); // Set to 1 when using HTTPS
    ini_set('session.cookie_samesite', 'Strict');
    session_start();
}

/**
 * Google reCAPTCHA v3 Configuration
 * Get keys from: https://www.google.com/recaptcha/admin/create
 */
define('RECAPTCHA_SITE_KEY', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'); // Test key - replace with yours
define('RECAPTCHA_SECRET_KEY', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'); // Test key - replace with yours
define('RECAPTCHA_THRESHOLD', 0.5); // Score threshold (0.0 to 1.0)

/**
 * Rate Limiting Configuration
 */
define('RATE_LIMIT_REQUESTS', 5); // Max requests
define('RATE_LIMIT_WINDOW', 300); // Time window in seconds (5 minutes)

/**
 * Generate CSRF Token
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF Token
 */
function verifyCSRFToken($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Verify reCAPTCHA v3
 */
function verifyRecaptcha($token) {
    $ch = curl_init();
    
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => RECAPTCHA_SECRET_KEY,
            'response' => $token
        ]),
        CURLOPT_RETURNTRANSFER => true
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($result['success'] && $result['score'] >= RECAPTCHA_THRESHOLD) {
        return true;
    }
    
    error_log("reCAPTCHA failed - Score: " . ($result['score'] ?? 'N/A'));
    return false;
}

/**
 * Rate Limiting
 */
function checkRateLimit($identifier) {
    $key = 'rate_limit_' . md5($identifier);
    
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = [
            'count' => 1,
            'first_request' => time()
        ];
        return true;
    }
    
    $data = $_SESSION[$key];
    $elapsed = time() - $data['first_request'];
    
    // Reset if window has passed
    if ($elapsed > RATE_LIMIT_WINDOW) {
        $_SESSION[$key] = [
            'count' => 1,
            'first_request' => time()
        ];
        return true;
    }
    
    // Check if limit exceeded
    if ($data['count'] >= RATE_LIMIT_REQUESTS) {
        return false;
    }
    
    // Increment counter
    $_SESSION[$key]['count']++;
    return true;
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Check if request is from localhost (for testing)
 */
function isLocalhost() {
    $whitelist = ['127.0.0.1', '::1', 'localhost'];
    return in_array($_SERVER['REMOTE_ADDR'] ?? '', $whitelist);
}

/**
 * Security Headers
 */
function setSecurityHeaders() {
    // Prevent clickjacking
    header('X-Frame-Options: SAMEORIGIN');
    
    // XSS Protection
    header('X-XSS-Protection: 1; mode=block');
    
    // Prevent MIME sniffing
    header('X-Content-Type-Options: nosniff');
    
    // Referrer Policy
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Content Security Policy (adjust as needed)
    if (!isLocalhost()) {
        header("Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://code.jquery.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");
    }
}

/**
 * Log security events
 */
function logSecurityEvent($event, $details = []) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'event' => $event,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'details' => $details
    ];
    
    error_log('SECURITY: ' . json_encode($logEntry));
}
?>




