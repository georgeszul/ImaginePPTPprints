#!/usr/bin/env python3
"""
Image Sorter for Imagine PPTP Prints
Automatically sorts images from PPTPRints folder into organized category folders
"""

import os
import shutil
from pathlib import Path
import re

def create_category_folders():
    """Ensure all category folders exist."""
    base_path = Path("images")
    categories = ["tshirts", "business-cards", "hoodies", "stickers", "mugs", "banners"]
    
    for category in categories:
        folder_path = base_path / category
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ {category} folder ready")

def analyze_image_name(filename):
    """Analyze image filename to determine category."""
    filename_lower = filename.lower()
    
    # Facebook images with numbers - these are likely product photos
    if filename.startswith("facebook_image_"):
        # Assign to different categories based on number patterns
        try:
            num = int(filename.split("_")[2].split(".")[0])
            # Distribute evenly across categories
            categories = ["tshirts", "hoodies", "business-cards", "stickers", "mugs", "banners"]
            category_index = (num - 1) % len(categories)
            return categories[category_index]
        except:
            return "tshirts"  # Default fallback
    
    # Facebook ID images - these are likely the main product photos
    elif re.match(r'\d+_\d+_\d+_n\.(jpg|jpeg)', filename):
        # These are the main product images, distribute them
        if "539738239" in filename or "539634838" in filename or "539586768" in filename:
            return "tshirts"  # Main t-shirt examples
        elif "536272" in filename or "536273" in filename:
            return "hoodies"  # Hoodie examples
        elif "536268" in filename:
            return "business-cards"  # Business card examples
        elif "536270" in filename:
            return "stickers"  # Sticker examples
        elif "536274" in filename:
            return "mugs"  # Mug examples
        else:
            return "banners"  # Banner examples
    
    # Default fallback
    return "tshirts"

def sort_images():
    """Sort all images from PPTPRints into category folders."""
    source_folder = Path("images/PPTPRints")
    base_path = Path("images")
    
    if not source_folder.exists():
        print("❌ PPTPRints folder not found!")
        return
    
    # Get all image files
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    image_files = [f for f in source_folder.iterdir() 
                   if f.is_file() and f.suffix.lower() in image_extensions]
    
    if not image_files:
        print("❌ No image files found in PPTPRints folder!")
        return
    
    print(f"📸 Found {len(image_files)} images to sort")
    print("🔄 Starting automatic sorting...")
    
    # Track sorting results
    sorting_results = {}
    
    for image_file in image_files:
        # Determine category
        category = analyze_image_name(image_file.name)
        
        # Create destination path
        dest_folder = base_path / category
        dest_path = dest_folder / image_file.name
        
        # Handle duplicate names
        counter = 1
        original_name = image_file.stem
        original_ext = image_file.suffix
        
        while dest_path.exists():
            new_name = f"{original_name}_{counter}{original_ext}"
            dest_path = dest_folder / new_name
            counter += 1
        
        try:
            # Copy image to category folder
            shutil.copy2(image_file, dest_path)
            
            # Track results
            if category not in sorting_results:
                sorting_results[category] = []
            sorting_results[category].append(dest_path.name)
            
            print(f"✅ {image_file.name} → {category}/")
            
        except Exception as e:
            print(f"❌ Error copying {image_file.name}: {e}")
    
    return sorting_results

def show_sorting_results(results):
    """Display the results of the sorting operation."""
    if not results:
        print("❌ No images were sorted!")
        return
    
    print("\n" + "="*60)
    print("🎯 IMAGE SORTING COMPLETE!")
    print("="*60)
    
    total_images = sum(len(images) for images in results.values())
    print(f"📊 Total images sorted: {total_images}")
    
    for category, images in results.items():
        print(f"\n📁 {category.upper()} ({len(images)} images):")
        for img in images[:5]:  # Show first 5 images
            print(f"   📸 {img}")
        if len(images) > 5:
            print(f"   ... and {len(images) - 5} more")
    
    print("\n" + "="*60)
    print("🚀 NEXT STEPS:")
    print("1. Check each category folder to verify sorting")
    print("2. Move any misplaced images manually if needed")
    print("3. Your products page will now showcase organized images!")
    print("4. Run this script again if you add more images")
    print("="*60)

def main():
    """Main function to run the image sorter."""
    print("🎨 Imagine PPTP Prints - Automatic Image Sorter")
    print("=" * 55)
    
    try:
        # Create category folders
        create_category_folders()
        
        # Sort images
        results = sort_images()
        
        # Show results
        if results:
            show_sorting_results(results)
        else:
            print("❌ No images were sorted. Please check the PPTPRints folder.")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Please make sure you're running this script from the ImaginePPTPprints folder")

if __name__ == "__main__":
    main()
