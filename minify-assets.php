<?php
/**
 * CSS/JS Minification Tool
 * Removes whitespace and comments to reduce file size
 */

function minifyCSS($css) {
    // Remove comments
    $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
    
    // Remove whitespace
    $css = str_replace(["\r\n", "\r", "\n", "\t", '  ', '    ', '    '], '', $css);
    
    // Remove spaces around colons and semicolons
    $css = str_replace([' : ', ': ', ' :', ' ;', '; '], [':', ':', ':', ';', ';'], $css);
    
    // Remove spaces around brackets
    $css = str_replace([' {', '{ ', ' }', '} '], ['{', '{', '}', '}'], $css);
    
    return trim($css);
}

function minifyJS($js) {
    // Remove single-line comments
    $js = preg_replace('~//.*~', '', $js);
    
    // Remove multi-line comments
    $js = preg_replace('~/\*.*?\*/~s', '', $js);
    
    // Remove whitespace
    $js = preg_replace('/\s+/', ' ', $js);
    
    // Remove spaces around operators (carefully)
    $js = preg_replace('/\s*([=+\-*\/%<>!&|,;:?{}()\[\]])\s*/', '$1', $js);
    
    return trim($js);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Asset Minifier - Imagine PPTP Prints</title>
    <style>
        body { font-family: Arial; max-width: 1000px; margin: 50px auto; padding: 20px; background: #f3f4f6; }
        .card { background: white; padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; }
        .success { background: #d1fae5; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .info { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 10px 0; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 4px; }
        .btn { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 10px 5px; border: none; cursor: pointer; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
        .stat { text-align: center; padding: 20px; background: #f9fafb; border-radius: 8px; }
        .stat-number { font-size: 2rem; font-weight: bold; color: #3b82f6; }
    </style>
</head>
<body>
    <h1>🗜️ CSS/JS Minification Tool</h1>
    
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['minify'])) {
        $cssFiles = ['css/main.css', 'assets/css/enhanced.css', 'assets/css/visual-enhancements.css'];
        $jsFiles = ['js/main.js', 'assets/js/main.js', 'assets/js/performance.js', 'assets/js/visual-effects.js'];
        
        $totalSizeBefore = 0;
        $totalSizeAfter = 0;
        
        echo '<div class="card"><h2>📦 Minifying CSS Files...</h2>';
        
        foreach ($cssFiles as $file) {
            if (!file_exists($file)) continue;
            
            $content = file_get_contents($file);
            $sizeBefore = strlen($content);
            $totalSizeBefore += $sizeBefore;
            
            $minified = minifyCSS($content);
            $sizeAfter = strlen($minified);
            $totalSizeAfter += $sizeAfter;
            
            $minFile = str_replace('.css', '.min.css', $file);
            file_put_contents($minFile, $minified);
            
            $saved = $sizeBefore - $sizeAfter;
            $percent = ($saved / $sizeBefore) * 100;
            
            echo '<div class="success">';
            echo '✅ <strong>' . htmlspecialchars(basename($file)) . '</strong><br>';
            echo 'Before: ' . number_format($sizeBefore / 1024, 2) . ' KB → ';
            echo 'After: ' . number_format($sizeAfter / 1024, 2) . ' KB<br>';
            echo 'Saved: ' . number_format($saved / 1024, 2) . ' KB (' . number_format($percent, 1) . '%)<br>';
            echo 'Output: <code>' . $minFile . '</code>';
            echo '</div>';
        }
        
        echo '</div><div class="card"><h2>📦 Minifying JS Files...</h2>';
        
        foreach ($jsFiles as $file) {
            if (!file_exists($file)) continue;
            
            $content = file_get_contents($file);
            $sizeBefore = strlen($content);
            $totalSizeBefore += $sizeBefore;
            
            $minified = minifyJS($content);
            $sizeAfter = strlen($minified);
            $totalSizeAfter += $sizeAfter;
            
            $minFile = str_replace('.js', '.min.js', $file);
            file_put_contents($minFile, $minified);
            
            $saved = $sizeBefore - $sizeAfter;
            $percent = ($saved / $sizeBefore) * 100;
            
            echo '<div class="success">';
            echo '✅ <strong>' . htmlspecialchars(basename($file)) . '</strong><br>';
            echo 'Before: ' . number_format($sizeBefore / 1024, 2) . ' KB → ';
            echo 'After: ' . number_format($sizeAfter / 1024, 2) . ' KB<br>';
            echo 'Saved: ' . number_format($saved / 1024, 2) . ' KB (' . number_format($percent, 1) . '%)<br>';
            echo 'Output: <code>' . $minFile . '</code>';
            echo '</div>';
        }
        
        $totalSaved = $totalSizeBefore - $totalSizeAfter;
        $totalPercent = ($totalSaved / $totalSizeBefore) * 100;
        
        echo '</div><div class="card"><h2>📊 Summary</h2>';
        echo '<div class="stats">';
        echo '<div class="stat"><div class="stat-number">' . number_format($totalSizeBefore / 1024, 0) . ' KB</div><div>Before</div></div>';
        echo '<div class="stat"><div class="stat-number">' . number_format($totalSizeAfter / 1024, 0) . ' KB</div><div>After</div></div>';
        echo '<div class="stat"><div class="stat-number">' . number_format($totalPercent, 0) . '%</div><div>Reduced</div></div>';
        echo '</div>';
        echo '<div class="success"><h3>✅ Minification Complete!</h3>';
        echo '<p>Total saved: <strong>' . number_format($totalSaved / 1024, 2) . ' KB</strong></p>';
        echo '<p>All .min.css and .min.js files created!</p></div>';
        echo '<div class="info"><strong>💡 Tip:</strong> Update your HTML to use .min.css and .min.js files for production.</div>';
        echo '</div>';
        
    } else {
        ?>
        <div class="card">
            <h2>📦 Minify CSS & JavaScript</h2>
            <div class="info">
                <p>This tool will create minified versions of your CSS and JavaScript files:</p>
                <ul>
                    <li>✅ Remove comments and whitespace</li>
                    <li>✅ Reduce file size by 30-60%</li>
                    <li>✅ Faster page load times</li>
                    <li>✅ Better SEO scores</li>
                </ul>
            </div>
            
            <form method="POST">
                <button type="submit" name="minify" class="btn">🚀 Start Minification</button>
                <a href="index.php" class="btn" style="background: #6b7280;">← Back</a>
            </form>
        </div>
        <?php
    }
    ?>
</body>
</html>




