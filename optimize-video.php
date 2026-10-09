<?php
/**
 * Video Optimization Tool
 * Compress video and create multiple formats
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Optimizer - Imagine PPTP Prints</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: #f3f4f6;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            margin: 20px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        h1 { color: #1f2937; }
        .info { background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .success { background: #d1fae5; padding: 15px; border-radius: 8px; border-left: 4px solid #059669; }
        .warning { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
        .btn { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 10px 5px; }
        .btn:hover { background: #2563eb; }
    </style>
</head>
<body>
    <h1>🎬 Video Optimization Guide</h1>
    
    <div class="card">
        <h2>📊 Current Video Analysis</h2>
        <?php
        $videoFile = '4508057-uhd_3840_2160_25fps.mp4';
        
        if (file_exists($videoFile)) {
            $fileSize = filesize($videoFile);
            echo '<div class="info">';
            echo '<strong>Current Video:</strong> ' . $videoFile . '<br>';
            echo '<strong>File Size:</strong> ' . number_format($fileSize / 1024 / 1024, 2) . ' MB<br>';
            echo '<strong>Format:</strong> MP4<br>';
            echo '</div>';
            
            // Recommendations
            echo '<div class="warning">';
            echo '<h3>⚠️ Optimization Recommendations:</h3>';
            echo '<ul>';
            
            if ($fileSize > 10 * 1024 * 1024) {
                echo '<li><strong>Large file size!</strong> Consider compressing to reduce bandwidth</li>';
            }
            
            echo '<li>Create WebM version for better compression (~30-50% smaller)</li>';
            echo '<li>Generate mobile-specific version (720p or 480p)</li>';
            echo '<li>Add poster image for faster initial load</li>';
            echo '<li>Use lazy loading to load only when visible</li>';
            echo '</ul>';
            echo '</div>';
        } else {
            echo '<div class="warning">Video file not found: ' . $videoFile . '</div>';
        }
        ?>
    </div>
    
    <div class="card">
        <h2>🛠️ Optimization Tools</h2>
        
        <h3>Option 1: FFmpeg (Recommended)</h3>
        <div class="info">
            <p><strong>FFmpeg</strong> is a professional video processing tool. Install it for best results:</p>
            <ol>
                <li>Download FFmpeg: <a href="https://www.gyan.dev/ffmpeg/builds/" target="_blank">https://www.gyan.dev/ffmpeg/builds/</a></li>
                <li>Extract to <code>C:\ffmpeg</code></li>
                <li>Add to PATH environment variable</li>
                <li>Run commands below in Command Prompt</li>
            </ol>
        </div>
        
        <h4>Compression Commands:</h4>
        <pre style="background: #1f2937; color: white; padding: 15px; border-radius: 8px; overflow-x: auto;">
# Compress to smaller MP4 (recommended quality)
ffmpeg -i <?php echo $videoFile; ?> -vcodec libx264 -crf 28 -preset slow -vf scale=1920:1080 paint-splat-compressed.mp4

# Create WebM version (better compression)
ffmpeg -i <?php echo $videoFile; ?> -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 paint-splat.webm

# Mobile version (720p)
ffmpeg -i <?php echo $videoFile; ?> -vcodec libx264 -crf 28 -vf scale=1280:720 paint-splat-mobile.mp4

# Mobile WebM (smallest)
ffmpeg -i <?php echo $videoFile; ?> -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1280:720 paint-splat-mobile.webm

# Generate poster image (first frame)
ffmpeg -i <?php echo $videoFile; ?> -ss 00:00:01 -vframes 1 paint-splat-poster.jpg
        </pre>
        
        <h3>Option 2: Online Tools (Easy)</h3>
        <div class="info">
            <p>Use these free online tools if you don't want to install FFmpeg:</p>
            <ul>
                <li><a href="https://www.freeconvert.com/video-compressor" target="_blank">FreeConvert</a> - Video compression</li>
                <li><a href="https://cloudconvert.com/" target="_blank">CloudConvert</a> - Format conversion</li>
                <li><a href="https://www.videosmaller.com/" target="_blank">VideoSmaller</a> - Quick compression</li>
                <li><a href="https://www.online-convert.com/" target="_blank">Online-Convert</a> - Multiple formats</li>
            </ul>
        </div>
    </div>
    
    <div class="card">
        <h2>✅ Implementation Checklist</h2>
        <div class="success">
            <p>After optimizing your videos, update your HTML:</p>
            <pre style="background: #1f2937; color: white; padding: 15px; border-radius: 8px; overflow-x: auto;">
&lt;video autoplay muted playsinline loop id="paint-splat-bg" poster="paint-splat-poster.jpg"&gt;
    &lt;source src="paint-splat.webm" type="video/webm"&gt;
    &lt;source src="paint-splat-compressed.mp4" type="video/mp4"&gt;
    Your browser does not support the video tag.
&lt;/video&gt;
            </pre>
            
            <p><strong>Benefits:</strong></p>
            <ul>
                <li>✅ Faster page load (50-70% smaller)</li>
                <li>✅ Better mobile experience</li>
                <li>✅ Reduced bandwidth costs</li>
                <li>✅ Improved SEO scores</li>
            </ul>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
        <a href="index.php" class="btn">← Back to Home</a>
        <a href="optimize-images.php" class="btn">🖼️ Optimize Images</a>
    </div>
</body>
</html>




