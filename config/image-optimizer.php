<?php
/**
 * Image Optimization
 * Automatic image compression and optimization
 */

/**
 * Optimize uploaded image
 */
function optimizeImage($sourcePath, $destinationPath = null, $quality = 85) {
    if ($destinationPath === null) {
        $destinationPath = $sourcePath;
    }
    
    // Get image info
    $imageInfo = getimagesize($sourcePath);
    if ($imageInfo === false) {
        return false;
    }
    
    list($width, $height, $type) = $imageInfo;
    
    // Create image resource based on type
    switch ($type) {
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($sourcePath);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($sourcePath);
            break;
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($sourcePath);
            break;
        case IMAGETYPE_WEBP:
            $image = imagecreatefromwebp($sourcePath);
            break;
        default:
            return false;
    }
    
    if (!$image) {
        return false;
    }
    
    // Resize if too large (max 2000px)
    $maxDimension = 2000;
    if ($width > $maxDimension || $height > $maxDimension) {
        $ratio = $width / $height;
        
        if ($width > $height) {
            $newWidth = $maxDimension;
            $newHeight = $maxDimension / $ratio;
        } else {
            $newHeight = $maxDimension;
            $newWidth = $maxDimension * $ratio;
        }
        
        $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
        
        // Preserve transparency for PNG
        if ($type === IMAGETYPE_PNG) {
            imagealphablending($resizedImage, false);
            imagesavealpha($resizedImage, true);
        }
        
        imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);
        $image = $resizedImage;
    }
    
    // Save optimized image
    $success = false;
    switch ($type) {
        case IMAGETYPE_JPEG:
            $success = imagejpeg($image, $destinationPath, $quality);
            break;
        case IMAGETYPE_PNG:
            // PNG uses compression level 0-9 (we convert quality 0-100 to 0-9)
            $compression = round((100 - $quality) / 11.11);
            imagealphablending($image, false);
            imagesavealpha($image, true);
            $success = imagepng($image, $destinationPath, $compression);
            break;
        case IMAGETYPE_GIF:
            $success = imagegif($image, $destinationPath);
            break;
        case IMAGETYPE_WEBP:
            $success = imagewebp($image, $destinationPath, $quality);
            break;
    }
    
    imagedestroy($image);
    
    return $success;
}

/**
 * Convert image to WebP format
 */
function convertToWebP($sourcePath, $quality = 85) {
    $imageInfo = getimagesize($sourcePath);
    if ($imageInfo === false) {
        return false;
    }
    
    list($width, $height, $type) = $imageInfo;
    
    // Create image resource
    switch ($type) {
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($sourcePath);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($sourcePath);
            break;
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($sourcePath);
            break;
        default:
            return false;
    }
    
    if (!$image) {
        return false;
    }
    
    // Generate WebP filename
    $pathInfo = pathinfo($sourcePath);
    $webpPath = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '.webp';
    
    // Save as WebP
    $success = imagewebp($image, $webpPath, $quality);
    imagedestroy($image);
    
    return $success ? $webpPath : false;
}

/**
 * Generate responsive image sizes
 */
function generateResponsiveImages($sourcePath, $sizes = [400, 800, 1200, 1600]) {
    $imageInfo = getimagesize($sourcePath);
    if ($imageInfo === false) {
        return false;
    }
    
    list($originalWidth, $originalHeight, $type) = $imageInfo;
    
    $pathInfo = pathinfo($sourcePath);
    $generatedImages = [];
    
    foreach ($sizes as $maxWidth) {
        // Skip if original is smaller
        if ($originalWidth <= $maxWidth) {
            continue;
        }
        
        $ratio = $originalWidth / $originalHeight;
        $newWidth = $maxWidth;
        $newHeight = $maxWidth / $ratio;
        
        // Load original image
        switch ($type) {
            case IMAGETYPE_JPEG:
                $image = imagecreatefromjpeg($sourcePath);
                break;
            case IMAGETYPE_PNG:
                $image = imagecreatefrompng($sourcePath);
                break;
            default:
                continue 2;
        }
        
        // Create resized image
        $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
        
        if ($type === IMAGETYPE_PNG) {
            imagealphablending($resizedImage, false);
            imagesavealpha($resizedImage, true);
        }
        
        imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);
        
        // Save resized image
        $newFilename = $pathInfo['filename'] . '-' . $maxWidth . 'w.' . $pathInfo['extension'];
        $newPath = $pathInfo['dirname'] . '/' . $newFilename;
        
        if ($type === IMAGETYPE_JPEG) {
            imagejpeg($resizedImage, $newPath, 85);
        } else {
            imagepng($resizedImage, $newPath, 6);
        }
        
        imagedestroy($image);
        imagedestroy($resizedImage);
        
        $generatedImages[$maxWidth] = $newPath;
    }
    
    return $generatedImages;
}

/**
 * Get optimized image sizes
 */
function getImageSizes($filename) {
    $pathInfo = pathinfo($filename);
    $pattern = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '-*w.' . $pathInfo['extension'];
    return glob($pattern);
}

/**
 * Generate srcset attribute for responsive images
 */
function generateSrcSet($imagePath) {
    $sizes = getImageSizes($imagePath);
    
    if (empty($sizes)) {
        return '';
    }
    
    $srcset = [];
    foreach ($sizes as $size) {
        if (preg_match('/-(\d+)w\./', $size, $matches)) {
            $width = $matches[1];
            $srcset[] = $size . ' ' . $width . 'w';
        }
    }
    
    return implode(', ', $srcset);
}
?>




