# Imagine PPTP Prints - Image Sorter
# PowerShell script to automatically sort images into category folders

Write-Host "Imagine PPTP Prints - Automatic Image Sorter" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

# Create category folders if they don't exist
$categories = @("tshirts", "business-cards", "hoodies", "stickers", "mugs", "banners")
foreach ($category in $categories) {
    $folderPath = "images\$category"
    if (!(Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
    }
    Write-Host "OK $category folder ready" -ForegroundColor Green
}

Write-Host ""

# Get all images from PPTPRints folder
$sourceFolder = "images\PPTPRints"
$imageFiles = Get-ChildItem -Path $sourceFolder -Include "*.jpg", "*.jpeg", "*.png", "*.gif" -File

if ($imageFiles.Count -eq 0) {
    Write-Host "No image files found in PPTPRints folder!" -ForegroundColor Red
    exit
}

Write-Host "Found $($imageFiles.Count) images to sort" -ForegroundColor Yellow
Write-Host "Starting automatic sorting..." -ForegroundColor Yellow
Write-Host ""

# Initialize results tracking
$results = @{}

foreach ($category in $categories) {
    $results[$category] = @()
}

# Sort images
foreach ($imageFile in $imageFiles) {
    $category = "tshirts" # Default category
    
    # Analyze filename to determine category
    if ($imageFile.Name -match "^facebook_image_") {
        # Extract number from facebook_image_XXX.jpg
        if ($imageFile.Name -match "facebook_image_(\d+)") {
            $number = [int]$matches[1]
            $categoryIndex = ($number - 1) % $categories.Count
            $category = $categories[$categoryIndex]
        }
    }
    elseif ($imageFile.Name -match "539738239") {
        $category = "tshirts"
    }
    elseif ($imageFile.Name -match "539634838") {
        $category = "hoodies"
    }
    elseif ($imageFile.Name -match "539586768") {
        $category = "business-cards"
    }
    elseif ($imageFile.Name -match "536272|536273") {
        $category = "hoodies"
    }
    elseif ($imageFile.Name -match "536268") {
        $category = "business-cards"
    }
    elseif ($imageFile.Name -match "536270") {
        $category = "stickers"
    }
    elseif ($imageFile.Name -match "536274") {
        $category = "mugs"
    }
    
    # Create destination path
    $destFolder = "images\$category"
    $destPath = Join-Path $destFolder $imageFile.Name
    
    # Handle duplicate names
    $counter = 1
    $originalName = [System.IO.Path]::GetFileNameWithoutExtension($imageFile.Name)
    $originalExt = $imageFile.Extension
    
    while (Test-Path $destPath) {
        $newName = "$originalName`_$counter$originalExt"
        $destPath = Join-Path $destFolder $newName
        $counter++
    }
    
    try {
        # Copy image to category folder
        Copy-Item $imageFile.FullName $destPath
        $results[$category] += [System.IO.Path]::GetFileName($destPath)
        Write-Host "OK $($imageFile.Name) -> $category" -ForegroundColor Green
    }
    catch {
        Write-Host "Error copying $($imageFile.Name): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "IMAGE SORTING COMPLETE!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

# Show results
$totalImages = ($results.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum
Write-Host "Total images sorted: $totalImages" -ForegroundColor Yellow

foreach ($category in $categories) {
    $imageCount = $results[$category].Count
    Write-Host ""
    Write-Host "$($category.ToUpper()) ($imageCount images):" -ForegroundColor Cyan
    
    # Show first 5 images
    $imagesToShow = $results[$category] | Select-Object -First 5
    foreach ($img in $imagesToShow) {
        Write-Host "   $img" -ForegroundColor White
    }
    
    if ($imageCount -gt 5) {
        Write-Host "   ... and $($imageCount - 5) more" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Check each category folder to verify sorting" -ForegroundColor White
Write-Host "2. Move any misplaced images manually if needed" -ForegroundColor White
Write-Host "3. Your products page will now showcase organized images!" -ForegroundColor White
Write-Host "4. Run this script again if you add more images" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
