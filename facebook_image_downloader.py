#!/usr/bin/env python3
"""
Facebook Image Downloader for Imagine PPTP Prints
This script helps organize and prepare for downloading images from Facebook.

Note: Due to Facebook's security measures, this script provides guidance
and folder organization rather than direct downloading.
"""

import os
import sys
from pathlib import Path

def create_image_folders():
    """Create organized folders for different product categories."""
    base_path = Path("images")
    
    # Define product categories
    categories = [
        "tshirts",
        "business-cards", 
        "hoodies",
        "stickers",
        "mugs",
        "banners"
    ]
    
    print("📁 Creating organized image folders...")
    
    for category in categories:
        folder_path = base_path / category
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ Created: {folder_path}")
    
    print("\n🎯 Folder structure ready for your Facebook images!")

def show_download_instructions():
    """Display step-by-step instructions for downloading images."""
    print("\n" + "="*60)
    print("📥 FACEBOOK IMAGE DOWNLOAD INSTRUCTIONS")
    print("="*60)
    
    instructions = [
        "1. 🌐 Visit your Facebook profile:",
        "   https://www.facebook.com/profile.php?id=61558797091752&sk=photos_by",
        "",
        "2. 📸 For each product category:",
        "   • Right-click on the image",
        "   • Select 'Save image as...'",
        "   • Choose the appropriate folder:",
        "     - T-shirts → images/tshirts/",
        "     - Business Cards → images/business-cards/",
        "     - Hoodies → images/hoodies/",
        "     - Stickers → images/stickers/",
        "     - Mugs → images/mugs/",
        "     - Banners → images/banners/",
        "",
        "3. 🏷️ Use descriptive filenames:",
        "   • Example: 'team-shirt-design-01.jpg'",
        "   • Example: 'business-card-premium.jpg'",
        "   • Example: 'event-hoodie-2024.jpg'",
        "",
        "4. 📱 Alternative methods:",
        "   • Use Facebook mobile app to save images",
        "   • Use browser extensions like 'Image Downloader'",
        "   • Take screenshots for quick reference",
        "",
        "5. 🔄 After downloading:",
        "   • Run this script again to update the website",
        "   • Images will automatically appear on your products page"
    ]
    
    for instruction in instructions:
        print(instruction)

def show_folder_contents():
    """Display current contents of image folders."""
    print("\n📂 Current Image Folder Contents:")
    print("-" * 40)
    
    base_path = Path("images")
    
    for folder in sorted(base_path.iterdir()):
        if folder.is_dir():
            image_count = len([f for f in folder.iterdir() if f.is_file()])
            print(f"📁 {folder.name}/ - {image_count} images")
            
            # Show first few images
            images = [f for f in folder.iterdir() if f.is_file()][:3]
            for img in images:
                print(f"   📸 {img.name}")
            if len([f for f in folder.iterdir() if f.is_file()]) > 3:
                print(f"   ... and {len([f for f in folder.iterdir() if f.is_file()]) - 3} more")

def main():
    """Main function to run the image organizer."""
    print("🎨 Imagine PPTP Prints - Image Organizer")
    print("=" * 50)
    
    try:
        # Create folders
        create_image_folders()
        
        # Show current contents
        show_folder_contents()
        
        # Show download instructions
        show_download_instructions()
        
        print("\n" + "="*60)
        print("🚀 NEXT STEPS:")
        print("1. Download images from Facebook using the instructions above")
        print("2. Place images in the appropriate folders")
        print("3. Run this script again to see updated contents")
        print("4. Your website will automatically showcase the new images!")
        print("="*60)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Please make sure you're running this script from the ImaginePPTPprints folder")
        sys.exit(1)

if __name__ == "__main__":
    main()
