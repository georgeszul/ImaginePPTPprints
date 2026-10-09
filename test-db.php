<?php
/**
 * Database Connection Test
 * Visit this page to verify your database setup
 */

// Include database configuration
require_once 'config/database.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Connection Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f3f4f6;
        }
        .status-box {
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .success {
            background: #d1fae5;
            border: 2px solid #059669;
            color: #047857;
        }
        .error {
            background: #fee2e2;
            border: 2px solid #dc2626;
            color: #b91c1c;
        }
        .info {
            background: #dbeafe;
            border: 2px solid #3b82f6;
            color: #1e40af;
        }
        h1 {
            color: #1f2937;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #e5e7eb;
        }
        th {
            background: #f9fafb;
            font-weight: 600;
        }
        code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>🔧 Database Connection Test</h1>
    
    <?php
    try {
        // Test database connection
        $db = getDB();
        
        echo '<div class="status-box success">';
        echo '<h2>✅ Database Connected Successfully!</h2>';
        echo '<p>Connection to <code>' . DB_NAME . '</code> established.</p>';
        echo '</div>';
        
        // Test tables
        echo '<h2>📊 Database Tables</h2>';
        $stmt = $db->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (empty($tables)) {
            echo '<div class="status-box error">';
            echo '<h3>❌ No Tables Found</h3>';
            echo '<p>Please run the SQL setup script from <code>database/setup.sql</code></p>';
            echo '</div>';
        } else {
            echo '<div class="status-box success">';
            echo '<h3>Found ' . count($tables) . ' tables:</h3>';
            echo '<ul>';
            foreach ($tables as $table) {
                echo '<li><code>' . htmlspecialchars($table) . '</code></li>';
            }
            echo '</ul>';
            echo '</div>';
            
            // Check contact_submissions table
            if (in_array('contact_submissions', $tables)) {
                echo '<h2>📬 Contact Submissions</h2>';
                $stmt = $db->query("SELECT COUNT(*) as count FROM contact_submissions");
                $count = $stmt->fetch();
                
                echo '<div class="status-box info">';
                echo '<p>Total submissions: <strong>' . $count['count'] . '</strong></p>';
                echo '</div>';
                
                if ($count['count'] > 0) {
                    $stmt = $db->query("SELECT name, email, service, submitted_at FROM contact_submissions ORDER BY submitted_at DESC LIMIT 5");
                    $submissions = $stmt->fetchAll();
                    
                    echo '<table>';
                    echo '<thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Date</th></tr></thead>';
                    echo '<tbody>';
                    foreach ($submissions as $sub) {
                        echo '<tr>';
                        echo '<td>' . htmlspecialchars($sub['name']) . '</td>';
                        echo '<td>' . htmlspecialchars($sub['email']) . '</td>';
                        echo '<td>' . htmlspecialchars($sub['service']) . '</td>';
                        echo '<td>' . htmlspecialchars($sub['submitted_at']) . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody></table>';
                }
            }
            
            // Check testimonials
            if (in_array('testimonials', $tables)) {
                echo '<h2>⭐ Testimonials</h2>';
                $stmt = $db->query("SELECT COUNT(*) as count FROM testimonials WHERE approved = 1");
                $count = $stmt->fetch();
                
                echo '<div class="status-box info">';
                echo '<p>Approved testimonials: <strong>' . $count['count'] . '</strong></p>';
                echo '</div>';
            }
        }
        
        // Database info
        echo '<h2>🔍 Database Information</h2>';
        echo '<table>';
        echo '<tr><th>Setting</th><th>Value</th></tr>';
        echo '<tr><td>Database Host</td><td><code>' . DB_HOST . '</code></td></tr>';
        echo '<tr><td>Database Name</td><td><code>' . DB_NAME . '</code></td></tr>';
        echo '<tr><td>Database User</td><td><code>' . DB_USER . '</code></td></tr>';
        echo '<tr><td>Character Set</td><td><code>' . DB_CHARSET . '</code></td></tr>';
        echo '<tr><td>PHP Version</td><td><code>' . PHP_VERSION . '</code></td></tr>';
        echo '<tr><td>PDO Driver</td><td><code>' . $db->getAttribute(PDO::ATTR_DRIVER_NAME) . '</code></td></tr>';
        echo '</table>';
        
        echo '<div class="status-box success">';
        echo '<h3>✅ Everything looks good!</h3>';
        echo '<p>Your database is properly configured and ready to use.</p>';
        echo '<p><strong>Next steps:</strong></p>';
        echo '<ul>';
        echo '<li>Configure Resend API in <code>config/email.php</code></li>';
        echo '<li>Test the contact form at <a href="contact.php">contact.php</a></li>';
        echo '</ul>';
        echo '</div>';
        
    } catch (PDOException $e) {
        echo '<div class="status-box error">';
        echo '<h2>❌ Database Connection Failed</h2>';
        echo '<p><strong>Error:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>';
        echo '<h3>Troubleshooting:</h3>';
        echo '<ol>';
        echo '<li>Make sure MySQL is running in XAMPP Control Panel</li>';
        echo '<li>Check database credentials in <code>config/database.php</code></li>';
        echo '<li>Verify database <code>' . DB_NAME . '</code> exists in phpMyAdmin</li>';
        echo '<li>Run the SQL setup script from <code>database/setup.sql</code></li>';
        echo '</ol>';
        echo '</div>';
    }
    ?>
    
    <div style="margin-top: 40px; padding: 20px; background: white; border-radius: 8px;">
        <h3>🔗 Useful Links</h3>
        <ul>
            <li><a href="http://localhost/phpmyadmin" target="_blank">phpMyAdmin</a> - Manage database</li>
            <li><a href="contact.php">Contact Form</a> - Test AJAX submission</li>
            <li><a href="index.php">Homepage</a> - View website</li>
        </ul>
    </div>
    
</body>
</html>




