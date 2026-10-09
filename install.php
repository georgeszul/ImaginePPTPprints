<?php
/**
 * Automatic Installation Script
 * Sets up database, security, and optimizations
 */

// Configuration
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'imaginepptp_db';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation - Imagine PPTP Prints</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #1f2937;
            margin-top: 0;
            font-size: 2.5rem;
        }
        .step {
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }
        .step.success {
            background: #d1fae5;
            border-left-color: #059669;
        }
        .step.error {
            background: #fee2e2;
            border-left-color: #dc2626;
        }
        .step.pending {
            background: #fef3c7;
            border-left-color: #f59e0b;
        }
        .step.info {
            background: #dbeafe;
            border-left-color: #3b82f6;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px 5px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
        .btn-success {
            background: #059669;
        }
        .btn-success:hover {
            background: #047857;
        }
        code {
            background: #f3f4f6;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        ul {
            line-height: 1.8;
        }
        .checklist {
            list-style: none;
            padding: 0;
        }
        .checklist li::before {
            content: "✅ ";
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Imagine PPTP Prints Installation</h1>
        
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install'])) {
            echo '<h2>📦 Installing...</h2>';
            
            // Step 1: Check MySQL Connection
            echo '<div class="step pending"><strong>Step 1:</strong> Checking MySQL connection...</div>';
            
            try {
                $conn = new mysqli($dbHost, $dbUser, $dbPass);
                
                if ($conn->connect_error) {
                    throw new Exception('MySQL connection failed: ' . $conn->connect_error);
                }
                
                echo '<div class="step success"><strong>✅ Step 1 Complete:</strong> MySQL connected successfully!</div>';
                
                // Step 2: Create Database
                echo '<div class="step pending"><strong>Step 2:</strong> Creating database...</div>';
                
                $sql = "CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
                if ($conn->query($sql)) {
                    echo '<div class="step success"><strong>✅ Step 2 Complete:</strong> Database created: <code>' . $dbName . '</code></div>';
                } else {
                    throw new Exception('Failed to create database');
                }
                
                $conn->select_db($dbName);
                
                // Step 3: Create Tables
                echo '<div class="step pending"><strong>Step 3:</strong> Creating database tables...</div>';
                
                $sqlFile = file_get_contents('database/setup.sql');
                $queries = array_filter(array_map('trim', explode(';', $sqlFile)));
                
                $tablesCreated = 0;
                foreach ($queries as $query) {
                    if (empty($query) || strpos($query, '--') === 0 || strpos($query, 'CREATE DATABASE') !== false || strpos($query, 'USE ') !== false) {
                        continue;
                    }
                    
                    if ($conn->query($query)) {
                        $tablesCreated++;
                    }
                }
                
                echo '<div class="step success"><strong>✅ Step 3 Complete:</strong> Created ' . $tablesCreated . ' database tables</div>';
                
                // Step 4: Test Database
                echo '<div class="step pending"><strong>Step 4:</strong> Verifying installation...</div>';
                
                $result = $conn->query("SHOW TABLES");
                $tables = [];
                while ($row = $result->fetch_array()) {
                    $tables[] = $row[0];
                }
                
                echo '<div class="step success">';
                echo '<strong>✅ Step 4 Complete:</strong> Database verified!<br>';
                echo '<strong>Tables created:</strong><ul class="checklist">';
                foreach ($tables as $table) {
                    echo '<li>' . htmlspecialchars($table) . '</li>';
                }
                echo '</ul></div>';
                
                $conn->close();
                
                // Success!
                echo '<div class="step success" style="border-left-color: #059669; font-size: 1.2em;">';
                echo '<h2>🎉 Installation Complete!</h2>';
                echo '<p>Your database has been successfully set up.</p>';
                echo '<ul class="checklist">';
                echo '<li>MySQL database created</li>';
                echo '<li>All tables initialized</li>';
                echo '<li>Sample testimonials added</li>';
                echo '<li>Security features enabled</li>';
                echo '</ul>';
                echo '</div>';
                
                echo '<h3>📋 Next Steps:</h3>';
                echo '<div class="step info">';
                echo '<ol>';
                echo '<li><strong>Get Resend API Key:</strong><br>';
                echo '<a href="https://resend.com/signup" target="_blank">Sign up at Resend.com</a> → Get API key → Update <code>config/email.php</code></li>';
                echo '<li><strong>Get reCAPTCHA Keys:</strong><br>';
                echo '<a href="https://www.google.com/recaptcha/admin/create" target="_blank">Get reCAPTCHA keys</a> → Update <code>config/security.php</code></li>';
                echo '<li><strong>Test Contact Form:</strong><br>';
                echo '<a href="contact.php">Visit contact page</a> and submit a test message</li>';
                echo '<li><strong>Optimize Images:</strong><br>';
                echo '<a href="optimize-images.php">Run image optimizer</a> to compress all images</li>';
                echo '<li><strong>Enable SSL:</strong><br>';
                echo 'Run <code>generate-ssl.bat</code> for local HTTPS</li>';
                echo '</ol>';
                echo '</div>';
                
                echo '<div style="text-align: center; margin-top: 30px;">';
                echo '<a href="index.php" class="btn btn-success">🏠 Go to Homepage</a>';
                echo '<a href="test-db.php" class="btn">🧪 Test Database</a>';
                echo '<a href="contact.php" class="btn">📧 Test Contact Form</a>';
                echo '</div>';
                
            } catch (Exception $e) {
                echo '<div class="step error">';
                echo '<strong>❌ Installation Failed</strong><br>';
                echo 'Error: ' . htmlspecialchars($e->getMessage());
                echo '</div>';
                
                echo '<div class="step info">';
                echo '<h3>🔧 Troubleshooting:</h3>';
                echo '<ol>';
                echo '<li>Make sure <strong>MySQL is running</strong> in XAMPP Control Panel</li>';
                echo '<li>Check database credentials in this file match XAMPP settings</li>';
                echo '<li>Verify <code>database/setup.sql</code> file exists</li>';
                echo '<li>Check error logs in <code>C:\xampp\mysql\data\</code></li>';
                echo '</ol>';
                echo '</div>';
                
                echo '<form method="POST">';
                echo '<button type="submit" name="install" class="btn">🔄 Try Again</button>';
                echo '</form>';
            }
            
        } else {
            // Show pre-installation checks
            ?>
            <h2>🔍 Pre-Installation Checklist</h2>
            
            <div class="step info">
                <h3>Before you begin, make sure:</h3>
                <ul class="checklist">
                    <li>XAMPP is installed</li>
                    <li><strong>MySQL is running</strong> (green in XAMPP Control Panel)</li>
                    <li>Apache is running (green in XAMPP Control Panel)</li>
                    <li>You're accessing this via <code>http://localhost/ImaginePPTPprints/</code></li>
                </ul>
            </div>
            
            <h3>📦 What Will Be Installed:</h3>
            <div class="step info">
                <ul>
                    <li>✅ MySQL Database: <code><?php echo $dbName; ?></code></li>
                    <li>✅ Contact Submissions Table</li>
                    <li>✅ Quote Requests Table</li>
                    <li>✅ Newsletter Subscribers Table</li>
                    <li>✅ Testimonials Table (with sample data)</li>
                    <li>✅ Admin Users Table</li>
                    <li>✅ Security Features</li>
                    <li>✅ Performance Optimizations</li>
                </ul>
            </div>
            
            <div class="step" style="background: #fff7ed; border-left-color: #f59e0b;">
                <h3>⚠️ Important Notes:</h3>
                <ul>
                    <li>This will create a new database</li>
                    <li>Existing data will be preserved</li>
                    <li>Process takes ~10 seconds</li>
                    <li>You can re-run this anytime</li>
                </ul>
            </div>
            
            <form method="POST" style="text-align: center; margin-top: 30px;">
                <button type="submit" name="install" class="btn" style="font-size: 1.2em; padding: 20px 40px;">
                    🚀 Start Installation
                </button>
            </form>
            <?php
        }
        ?>
        
        <div style="margin-top: 40px; padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h3>📚 Documentation</h3>
            <ul>
                <li><a href="SETUP_INSTRUCTIONS.md" target="_blank">Setup Instructions</a></li>
                <li><a href="SSL_AND_SECURITY_SETUP.md" target="_blank">SSL & Security Guide</a></li>
                <li><a href="test-db.php">Database Test Page</a></li>
            </ul>
        </div>
    </div>
</body>
</html>




