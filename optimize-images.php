<?php
/**
 * Batch Image Optimizer
 * Optimizes all images and converts to WebP
 */

require_once 'config/image-optimizer.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Optimizer - Imagine PPTP Prints</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 50px auto;
            padding: 20px;
            background: #f3f4f6;
        }
        h1 {
            color: #1f2937;
        }
        .status {
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            background: white;
            border-left: 4px solid #3b82f6;
        }
        .success {
            border-left-color: #059669;
            background: #d1fae5;
        }
        .processing {
            border-left-color: #f59e0b;
            background: #fef3c7;
        }
        .error {
            border-left-color: #dc2626;
            background: #fee2e2;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #3b82f6;
        }
        .stat-label {
            color: #6b7280;
            margin-top: 10px;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 5px;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover {
            background: #2563eb;
        }
        .progress-bar {
            width: 100%;
            height: 30px;
            background: #e5e7eb;
            border-radius: 15px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🗜️ Image Optimizer</h1>
    
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['optimize'])) {
        $imageDirs = [
            'images/shirts',
            'images/hoodies',
            'images/business cards',
            'images/banner',
            'images/stickers_'
        ];
        
        $totalImages = 0;
        $optimizedCount = 0;
        $webpCount = 0;
        $totalSizeBefore = 0;
        $totalSizeAfter = 0;
        $errors = [];
        
        echo '<h2>🔄 Processing Images...</h2>';
        
        foreach ($imageDirs as $dir) {
            if (!is_dir($dir)) {
                continue;
            }
            
            echo '<div class="status processing"><strong>📁 Directory:</strong> ' . htmlspecialchars($dir) . '</div>';
            
            $images = glob($dir . '/*.{jpg,jpeg,png,JPG,JPEG,PNG}', GLOB_BRACE);
            
            foreach ($images as $image) {
                $totalImages++;
                $sizeBefore = filesize($image);
                $totalSizeBefore += $sizeBefore;
                
                echo '<div class="status">';
                echo '<strong>Processing:</strong> ' . htmlspecialchars(basename($image)) . '<br>';
                echo '<small>Original size: ' . number_format($sizeBefore / 1024, 2) . ' KB</small><br>';
                
                // Optimize image
                if (optimizeImage($image, null, 85)) {
                    $sizeAfter = filesize($image);
                    $totalSizeAfter += $sizeAfter;
                    $saved = $sizeBefore - $sizeAfter;
                    $savedPercent = ($saved / $sizeBefore) * 100;
                    
                    echo '<small style="color: #059669;">✅ Optimized: ' . number_format($sizeAfter / 1024, 2) . ' KB ';
                    echo '(Saved: ' . number_format($saved / 1024, 2) . ' KB / ' . number_format($savedPercent, 1) . '%)</small><br>';
                    $optimizedCount++;
                } else {
                    echo '<small style="color: #dc2626;">❌ Failed to optimize</small><br>';
                    $errors[] = basename($image);
                }
                
                // Convert to WebP
                $webpPath = convertToWebP($image, 85);
                if ($webpPath) {
                    $webpSize = filesize($webpPath);
                    echo '<small style="color: #3b82f6;">🌐 WebP created: ' . number_format($webpSize / 1024, 2) . ' KB</small>';
                    $webpCount++;
                } else {
                    echo '<small style="color: #f59e0b;">⚠️ WebP conversion skipped</small>';
                }
                
                echo '</div>';
                
                // Flush output so user can see progress
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
        }
        
        // Show summary
        $totalSaved = $totalSizeBefore - $totalSizeAfter;
        $percentSaved = $totalSizeBefore > 0 ? ($totalSaved / $totalSizeBefore) * 100 : 0;
        
        echo '<h2>📊 Optimization Summary</h2>';
        echo '<div class="stats">';
        echo '<div class="stat-box">';
        echo '<div class="stat-number">' . $totalImages . '</div>';
        echo '<div class="stat-label">Images Processed</div>';
        echo '</div>';
        echo '<div class="stat-box">';
        echo '<div class="stat-number">' . $optimizedCount . '</div>';
        echo '<div class="stat-label">Successfully Optimized</div>';
        echo '</div>';
        echo '<div class="stat-box">';
        echo '<div class="stat-number">' . $webpCount . '</div>';
        echo '<div class="stat-label">WebP Images Created</div>';
        echo '</div>';
        echo '<div class="stat-box">';
        echo '<div class="stat-number">' . number_format($totalSaved / 1024 / 1024, 2) . ' MB</div>';
        echo '<div class="stat-label">Total Space Saved</div>';
        echo '</div>';
        echo '<div class="stat-box">';
        echo '<div class="stat-number">' . number_format($percentSaved, 1) . '%</div>';
        echo '<div class="stat-label">Size Reduction</div>';
        echo '</div>';
        echo '</div>';
        
        if (!empty($errors)) {
            echo '<div class="status error">';
            echo '<strong>⚠️ Errors:</strong><br>';
            echo implode('<br>', array_map('htmlspecialchars', $errors));
            echo '</div>';
        }
        
        echo '<div class="status success">';
        echo '<h3>✅ Optimization Complete!</h3>';
        echo '<p>Your images have been optimized and WebP versions created for better performance.</p>';
        echo '</div>';
        
    } else {
        ?>
        <div class="status">
            <h2>📸 Image Optimization Tool</h2>
            <p>This tool will:</p>
            <ul>
                <li>✅ Compress all JPEG and PNG images</li>
                <li>✅ Resize images larger than 2000px</li>
                <li>✅ Create WebP versions for modern browsers</li>
                <li>✅ Reduce file sizes by 40-70%</li>
                <li>✅ Improve page load speed</li>
            </ul>
            
            <p><strong>⚠️ Note:</strong> This will modify your original images. Make sure you have backups!</p>
        </div>
        
        <form method="POST">
            <button type="submit" name="optimize" class="btn">🚀 Start Optimization</button>
            <a href="index.php" class="btn" style="background: #6b7280;">← Back to Home</a>
        </form>
        
        <div class="status" style="margin-top: 30px;">
            <h3>📁 Directories to Optimize:</h3>
            <ul>
                <?php
                $dirs = ['images/shirts', 'images/hoodies', 'images/business cards', 'images/banner', 'images/stickers_'];
                foreach ($dirs as $dir) {
                    $count = count(glob($dir . '/*.{jpg,jpeg,png}', GLOB_BRACE));
                    echo '<li>' . htmlspecialchars($dir) . ' - <strong>' . $count . ' images</strong></li>';
                }
                ?>
            </ul>
        </div>
        <?php
    }
    ?>
    
    <div style="margin-top: 40px; padding: 20px; background: white; border-radius: 8px;">
        <h3>💡 Tips</h3>
        <ul>
            <li>Run this tool after uploading new images</li>
            <li>WebP images load 25-35% faster than JPEG/PNG</li>
            <li>Modern browsers automatically use WebP when available</li>
            <li>Keep originals in a backup folder before optimizing</li>
        </ul>
    </div>
</body>
</html>




