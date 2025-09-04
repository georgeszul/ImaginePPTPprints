# 🎨 Manual Image Sorting Guide for Imagine PPTP Prints

## 📁 Current Status
Your images are partially sorted! Here's what we have so far:

### ✅ Already Sorted:
- **T-Shirts**: 25+ images (most of your Facebook images)
- **Hoodies**: 1 image (539634838_...)
- **Business Cards**: 1 image (539586768_...)

### 🔄 Still Need Sorting:
- **Facebook numbered images** (facebook_image_001.jpg through facebook_image_041.jpg)
- **Any remaining Facebook ID images**

## 🎯 How to Sort the Remaining Images

### Option 1: Quick Manual Sorting (Recommended)

1. **Open File Explorer** and navigate to your `images` folder
2. **Open the PPTPRints folder** in one window
3. **Open each category folder** in separate windows:
   - `tshirts/`
   - `hoodies/`
   - `business-cards/`
   - `stickers/`
   - `mugs/`
   - `banners/`

4. **Drag and drop** images based on what they show:
   - **T-Shirts**: Any shirt designs, team uniforms, custom tops
   - **Hoodies**: Hoodie designs, sweatshirts, pullovers
   - **Business Cards**: Card designs, professional layouts
   - **Stickers**: Decal designs, promotional stickers
   - **Mugs**: Cup designs, drinkware
   - **Banners**: Large format designs, event banners

### Option 2: Use the Batch File
Run `sort_images.bat` again - it should work better now that some images are already sorted.

### Option 3: PowerShell Commands
Use these commands to copy specific images:

```powershell
# Copy Facebook numbered images to different categories
copy "images\PPTPRints\facebook_image_001.jpg" "images\tshirts\"
copy "images\PPTPRints\facebook_image_004.jpg" "images\hoodies\"
copy "images\PPTPRints\facebook_image_006.jpg" "images\business-cards\"
copy "images\PPTPRints\facebook_image_008.jpg" "images\stickers\"
copy "images\PPTPRints\facebook_image_009.jpg" "images\mugs\"
copy "images\PPTPRints\facebook_image_010.jpg" "images\banners\"
# Continue this pattern for all 41 images
```

## 📊 Target Distribution
For balanced representation, aim for:
- **T-Shirts**: 15-20 images
- **Hoodies**: 8-12 images
- **Business Cards**: 6-10 images
- **Stickers**: 6-10 images
- **Mugs**: 6-10 images
- **Banners**: 6-10 images

## 🚀 After Sorting
Once you're done:
1. **Check each folder** to make sure images are in the right place
2. **Your products page** will automatically showcase the organized images
3. **Run the website** to see your organized product gallery

## 💡 Tips
- **Look at the actual image content** rather than just the filename
- **Group similar designs** together in the same category
- **Keep the original images** in PPTPRints as a backup
- **Use descriptive names** if you want to rename any files

---
*Need help? The images will work perfectly even if they're not perfectly sorted - just get them roughly organized and your website will look great!*
