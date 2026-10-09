<?php
/**
 * Contact Form Submission Handler
 * Handles AJAX form submissions with validation and email notifications
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Include configuration files
require_once '../config/database.php';
require_once '../config/email.php';
require_once '../config/security.php';

// Set security headers
setSecurityHeaders();

// Start output buffering to prevent any accidental output
ob_start();

try {
    // Check if request is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }
    
    // Rate Limiting
    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!checkRateLimit($clientIP)) {
        logSecurityEvent('rate_limit_exceeded', ['ip' => $clientIP]);
        ob_end_clean();
        echo json_encode([
            'success' => false,
            'message' => 'Too many requests. Please try again in a few minutes.',
            'error' => 'rate_limit_exceeded'
        ]);
        exit;
    }
    
    // CSRF Token Verification (if not localhost)
    if (!isLocalhost()) {
        $csrfToken = $_POST['csrf_token'] ?? '';
        if (!verifyCSRFToken($csrfToken)) {
            logSecurityEvent('csrf_validation_failed', ['ip' => $clientIP]);
            ob_end_clean();
            echo json_encode([
                'success' => false,
                'message' => 'Security validation failed. Please refresh the page and try again.',
                'error' => 'csrf_failed'
            ]);
            exit;
        }
    }
    
    // Verify reCAPTCHA (if not localhost)
    if (!isLocalhost()) {
        $recaptchaToken = $_POST['recaptcha_token'] ?? '';
        if (!verifyRecaptcha($recaptchaToken)) {
            logSecurityEvent('recaptcha_failed', ['ip' => $clientIP]);
            ob_end_clean();
            echo json_encode([
                'success' => false,
                'message' => 'reCAPTCHA verification failed. Please try again.',
                'error' => 'recaptcha_failed'
            ]);
            exit;
        }
    }
    
    // Get and validate input data
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $service = sanitizeInput($_POST['service'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    $preferredContact = sanitizeInput($_POST['preferred_contact'] ?? 'email');
    $spanishPreference = isset($_POST['spanish_preference']) && $_POST['spanish_preference'] === 'true';
    
    // Validation
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Please enter a valid name';
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Please enter a message (at least 10 characters)';
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        ob_end_clean();
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Prepare data for database
    $formData = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'service' => $service,
        'message' => $message,
        'preferred_contact' => $preferredContact,
        'spanish_preference' => $spanishPreference
    ];
    
    // Save to database
    $db = getDB();
    $stmt = $db->prepare("
        INSERT INTO contact_submissions 
        (name, email, phone, service, message, preferred_contact, spanish_preference) 
        VALUES (:name, :email, :phone, :service, :message, :preferred_contact, :spanish_preference)
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':service' => $service,
        ':message' => $message,
        ':preferred_contact' => $preferredContact,
        ':spanish_preference' => $spanishPreference ? 1 : 0
    ]);
    
    $submissionId = $db->lastInsertId();
    
    // Send emails (but don't fail if email doesn't work)
    $emailSent = false;
    try {
        // Send notification to admin
        $adminEmailResult = sendContactNotification($formData);
        
        // Send confirmation to customer
        $customerEmailResult = sendCustomerConfirmation($formData);
        
        $emailSent = $adminEmailResult['success'] && $customerEmailResult['success'];
    } catch (Exception $e) {
        error_log("Email sending failed: " . $e->getMessage());
        // Don't fail the whole request if email fails
    }
    
    // Clean output buffer
    ob_end_clean();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => $spanishPreference 
            ? '¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.' 
            : 'Thank you! We\'ve received your message and will contact you soon.',
        'submission_id' => $submissionId,
        'email_sent' => $emailSent
    ]);
    
} catch (Exception $e) {
    ob_end_clean();
    error_log("Contact form error: " . $e->getMessage());
    
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred. Please try again or call us at (331) 255-5330.',
        'error' => $e->getMessage()
    ]);
}
?>

