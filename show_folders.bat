@echo off
echo.
echo ============================================================
echo    Imagine PPTP Prints - Image Folder Organizer
echo ============================================================
echo.

echo 📁 Your image folders are ready:
echo.
dir images /b /ad
echo.

echo 📂 Current folder contents:
echo ----------------------------------------
for /d %%i in (images\*) do (
    echo 📁 %%i\
    dir "%%i" /b 2>nul | find /c /v "" > temp_count.txt
    set /p count=<temp_count.txt
    echo    Images: !count!
    echo.
)
del temp_count.txt 2>nul

echo ============================================================
echo 📥 FACEBOOK IMAGE DOWNLOAD INSTRUCTIONS
echo ============================================================
echo.
echo 1. 🌐 Visit your Facebook profile:
echo    https://www.facebook.com/profile.php?id=61558797091752^&sk=photos_by
echo.
echo 2. 📸 For each product category:
echo    • Right-click on the image
echo    • Select 'Save image as...'
echo    • Choose the appropriate folder:
echo      - T-shirts → images\tshirts\
echo      - Business Cards → images\business-cards\
echo      - Hoodies → images\hoodies\
echo      - Stickers → images\stickers\
echo      - Mugs → images\mugs\
echo      - Banners → images\banners\
echo.
echo 3. 🏷️ Use descriptive filenames:
echo    • Example: 'team-shirt-design-01.jpg'
echo    • Example: 'business-card-premium.jpg'
echo    • Example: 'event-hoodie-2024.jpg'
echo.
echo 4. 📱 Alternative methods:
echo    • Use Facebook mobile app to save images
echo    • Use browser extensions like 'Image Downloader'
echo    • Take screenshots for quick reference
echo.
echo 5. 🔄 After downloading:
echo    • Run this batch file again to see updated contents
echo    • Images will automatically appear on your products page
echo.
echo ============================================================
echo 🚀 NEXT STEPS:
echo 1. Download images from Facebook using the instructions above
echo 2. Place images in the appropriate folders
echo 3. Run this batch file again to see updated contents
echo 4. Your website will automatically showcase the new images!
echo ============================================================
echo.
pause
