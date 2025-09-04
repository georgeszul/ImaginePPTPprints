@echo off
echo.
echo ============================================================
echo    Imagine PPTP Prints - Image Sorter
echo ============================================================
echo.

echo 🎯 Starting automatic image sorting...
echo.

REM Create category folders if they don't exist
if not exist "images\tshirts" mkdir "images\tshirts"
if not exist "images\business-cards" mkdir "images\business-cards"
if not exist "images\hoodies" mkdir "images\hoodies"
if not exist "images\stickers" mkdir "images\stickers"
if not exist "images\mugs" mkdir "images\mugs"
if not exist "images\banners" mkdir "images\banners"

echo ✅ Category folders ready
echo.

REM Count images in PPTPRints
set count=0
for %%f in (images\PPTPRints\*.jpg images\PPTPRints\*.jpeg images\PPTPRints\*.png) do set /a count+=1

echo 📸 Found %count% images to sort
echo.

REM Sort Facebook numbered images
echo 🔄 Sorting facebook_image_* files...
for %%f in (images\PPTPRints\facebook_image_*.jpg) do (
    echo 📁 Processing: %%~nxf
    REM Extract number and assign to category
    for /f "tokens=3 delims=_" %%a in ("%%~nxf") do (
        set num=%%a
        set /a category_num=!num! %% 6
        if !category_num!==0 set category=tshirts
        if !category_num!==1 set category=hoodies
        if !category_num!==2 set category=business-cards
        if !category_num!==3 set category=stickers
        if !category_num!==4 set category=mugs
        if !category_num!==5 set category=banners
        echo    → !category!\
        copy "%%f" "images\!category!\" >nul
    )
)

REM Sort Facebook ID images
echo 🔄 Sorting Facebook ID images...
for %%f in (images\PPTPRints\*_*_*_n.jpg) do (
    echo 📁 Processing: %%~nxf
    if "%%~nxf"=="539738239_122202396998293236_2183067847999368314_n.jpg" (
        echo    → tshirts\
        copy "%%f" "images\tshirts\" >nul
    ) else if "%%~nxf"=="539634838_122202397106293236_2065046746168162236_n.jpg" (
        echo    → hoodies\
        copy "%%f" "images\hoodies\" >nul
    ) else if "%%~nxf"=="539586768_122202396788293236_2819796790172946060_n.jpg" (
        echo    → business-cards\
        copy "%%f" "images\business-cards\" >nul
    ) else (
        echo    → tshirts\ (default)
        copy "%%f" "images\tshirts\" >nul
    )
)

echo.
echo ============================================================
echo 🎉 IMAGE SORTING COMPLETE!
echo ============================================================
echo.

REM Show results
echo 📊 Images sorted by category:
echo.
for %%d in (tshirts business-cards hoodies stickers mugs banners) do (
    set count=0
    for %%f in (images\%%d\*.jpg images\%%d\*.jpeg images\%%d\*.png) do set /a count+=1
    echo 📁 %%d: !count! images
)

echo.
echo ============================================================
echo 🚀 NEXT STEPS:
echo 1. Check each category folder to verify sorting
echo 2. Move any misplaced images manually if needed
echo 3. Your products page will now showcase organized images!
echo ============================================================
echo.
pause
