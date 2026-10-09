<?php
require_once 'config.php';
http_response_code(403);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Access Forbidden - <?php echo SITE_NAME; ?></title>
    <link rel="stylesheet" href="css/main.css">
    <style>
        .error-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
        }
        .error-content {
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 20px;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .error-code {
            font-size: 8rem;
            font-weight: 900;
            color: #dc2626;
            margin: 0;
            line-height: 1;
        }
        .error-title {
            font-size: 2rem;
            color: #1f2937;
            margin: 1rem 0;
        }
        .error-message {
            color: #6b7280;
            margin: 1rem 0 2rem;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 5px;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="error-page">
        <div class="error-content">
            <div class="error-code">403</div>
            <h1 class="error-title">Access Forbidden</h1>
            <p class="error-message">You don't have permission to access this resource.</p>
            <div>
                <a href="index.php" class="btn">← Back to Home</a>
                <a href="contact.php" class="btn">Contact Us</a>
            </div>
        </div>
    </div>
</body>
</html>




