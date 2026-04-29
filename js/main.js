// Enhanced Interactive Navbar
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Search Functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');

    if (searchToggle && searchDropdown) {
        // Toggle search dropdown
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchDropdown.classList.toggle('active');
            
            // Focus on input when dropdown opens
            if (searchDropdown.classList.contains('active')) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (searchContainer && !searchContainer.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });

        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                
                if (query) {
                    // Perform search
                    performSearch(query);
                    searchDropdown.classList.remove('active');
                    searchInput.value = '';
                }
            });
        }

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchDropdown.classList.contains('active')) {
                searchDropdown.classList.remove('active');
            }
        });
    }

    // Add scroll effect to header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Form validation for contact forms
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });
});

// Search functionality
function performSearch(query) {
    // Example: Search through services
    const searchableContent = [
        { title: 'Custom Shirts', content: 'High quality printed shirts for businesses and special occasions', url: 'services.html#custom-shirts' },
        { title: 'Custom Hoodies', content: 'Personalized hoodies perfect for teams, events, and branding', url: 'services.html#custom-hoodies' },
        { title: 'Custom Hats', content: 'Professional hats and caps with your custom design or branding', url: 'services.html#custom-hats' },
        { title: 'Design to Print', content: 'Send us your design, we\'ll make the rest!', url: 'services.html' }
    ];

    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
        // Show search results (you can customize this)
        alert(`Found ${results.length} results for "${query}". Check our services page for more details!`);
        // Optionally redirect to services page
        // window.location.href = 'services.html';
    } else {
        alert(`No results found for "${query}". Please try different keywords or contact us for assistance.`);
    }
}

// Enhanced hover effects for rotating images
function setupImageHoverEffects() {
    const images = document.querySelectorAll('.image-rotator img');

    images.forEach((img, index) => {
        if (img.dataset.hoverBound === '1') return;
        img.dataset.hoverBound = '1';

        // Remove modal attributes since we don't want clicking
        img.removeAttribute('data-modal');
        img.removeAttribute('data-modal-src');
        img.removeAttribute('data-modal-title');
        
        // Add enhanced hover effects
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(3deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 180, 216, 0.4)';
            this.style.zIndex = '10';
            this.style.filter = 'brightness(1.1)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Add a subtle bounce effect
            this.style.animation = 'imageBounce 0.6s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
            this.style.filter = 'brightness(0.95)';
            this.style.transition = 'all 0.3s ease';
            this.style.animation = 'none';
        });
        
        // Add click effect for extra interactivity
        img.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(-1deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.15) rotate(3deg)';
            }, 150);
        });
    });
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize enhanced hover effects for images
    setupImageHoverEffects();

    // Pricing Calculator Functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePrice);
    }

    // Auto-calculate when inputs change
    const calculatorInputs = document.querySelectorAll('#productType, #quantity, #printType, #colors');
    calculatorInputs.forEach(input => {
        input.addEventListener('change', calculatePrice);
        input.addEventListener('input', calculatePrice);
    });

    function calculatePrice() {
        const productType = document.getElementById('productType').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 0;
        const printType = document.getElementById('printType').value;
        const colors = parseInt(document.getElementById('colors').value) || 0;

        if (!productType || quantity === 0) {
            return;
        }

        // Base pricing structure
        const basePrices = {
            'shirts': 8,
            'hoodies': 15,
            'hats': 6
        };

        const printMultipliers = {
            'screen': 1,
            'embroidery': 1.5,
            'heat': 1.2
        };

        const colorMultipliers = {
            1: 1,
            2: 1.2,
            3: 1.4,
            4: 1.6,
            5: 1.8,
            6: 2.0,
            7: 2.2,
            8: 2.4
        };

        // Calculate costs
        const basePrice = basePrices[productType];
        const printCost = basePrice * printMultipliers[printType] * colorMultipliers[colors];
        const setupFee = printType === 'embroidery' ? 25 : 15;
        const totalPerItem = printCost + setupFee;

        // Bulk discounts
        let bulkDiscount = 0;
        if (quantity >= 100) bulkDiscount = 15;
        else if (quantity >= 50) bulkDiscount = 10;
        else if (quantity >= 25) bulkDiscount = 5;

        const discountMultiplier = (100 - bulkDiscount) / 100;
        const finalPricePerItem = totalPerItem * discountMultiplier;
        const orderTotal = finalPricePerItem * quantity;

        // Update display
        document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
        document.getElementById('printingCost').textContent = `$${printCost.toFixed(2)}`;
        document.getElementById('setupFee').textContent = `$${setupFee.toFixed(2)}`;
        document.getElementById('totalPerItem').textContent = `$${finalPricePerItem.toFixed(2)}`;
        document.getElementById('orderTotal').textContent = `$${orderTotal.toFixed(2)}`;
        document.getElementById('bulkDiscount').textContent = `${bulkDiscount}%`;

        // Update turnaround time
        let turnaround = '3-5 business days';
        if (quantity >= 100) turnaround = '7-10 business days';
        else if (quantity >= 50) turnaround = '5-7 business days';
        document.getElementById('turnaround').textContent = turnaround;
    }

    // Initialize calculator with default values
    if (document.getElementById('productType')) {
        calculatePrice();
    }

    // File Upload Functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const resetDesignBtn = document.getElementById('resetDesign');

    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // File selection
        fileInput.addEventListener('change', handleFileSelect);

        // Drag and drop
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);

        // Reset design
        if (resetDesignBtn) {
            resetDesignBtn.addEventListener('click', resetDesign);
        }
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }

    function processFile(file) {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or SVG)');
            return;
        }

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        // Show preview
        showPreview(file);
    }

    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const designUrl = e.target.result;
            
            // Update all design overlays
            document.querySelectorAll('.design-overlay').forEach(overlay => {
                overlay.style.backgroundImage = `url(${designUrl})`;
            });

            // Show preview container
            previewContainer.style.display = 'block';
            
            // Hide upload area
            uploadArea.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    function resetDesign() {
        // Clear design overlays
        document.querySelectorAll('.design-overlay').forEach(overlay => {
            overlay.style.backgroundImage = 'none';
        });

        // Show upload area
        uploadArea.style.display = 'block';
        
        // Hide preview container
        previewContainer.style.display = 'none';
        
        // Reset file input
        fileInput.value = '';
    }

    // Initialize Image Rotators
    initializeImageRotators();

    // Portfolio Filtering Functionality
    initializePortfolioFilters();
});

function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length === 0 || portfolioItems.length === 0) {
        return; // Not on portfolio page
    }

    // Initialize with "All Projects" filter active
    const allButton = document.querySelector('.category-btn[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Don't do anything if already active
            if (this.classList.contains('active')) {
                return;
            }

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items with smooth animation
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || itemCategory === category) {
                    // Show item with staggered animation
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50); // Staggered animation
                } else {
                    // Hide item with fade out
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Image Rotator System
function initializeImageRotators() {
    const rotators = document.querySelectorAll('.image-rotator');
    
    rotators.forEach(rotator => {
        const category = rotator.dataset.category;
        if (category) {
            loadImagesForCategory(rotator, category);
        }
    });
}

function loadImagesForCategory(rotator, category) {
    // Curated by SigLIP zero-shot classification on 638 FB photos + 113 site images.
    // Hi-res preferred where available; thumbnails (200px) used as fallback for
    // categories without hi-res source files (hoodies, hats, mugs, most stickers/banners).
    const categoryImages = {
        'tshirts': [
            'images/curated/tshirts/01.jpg',
            'images/curated/tshirts/02.jpg',
            'images/curated/tshirts/03.jpg',
            'images/curated/tshirts/04.jpg',
            'images/curated/tshirts/05.jpg',
            'images/curated/tshirts/06.jpg',
            'images/curated/tshirts/07.jpg',
            'images/curated/tshirts/08.jpg',
            'images/curated/tshirts/09.jpg',
            'images/curated/tshirts/10.jpg',
            'images/curated/tshirts/11.jpg',
            'images/curated/tshirts/12.jpg',
        ],
        'hoodies': [
            'images/curated/hoodies/01.jpg',
            'images/curated/hoodies/02.jpeg',
            'images/curated/hoodies/03.jpeg',
            'images/curated/hoodies/04.jpeg',
            'images/curated/hoodies/05.jpeg',
            'images/curated/hoodies/06.jpeg',
            'images/curated/hoodies/07.jpeg',
            'images/curated/hoodies/08.jpeg',
            'images/curated/hoodies/09.jpeg',
            'images/curated/hoodies/10.jpeg',
            'images/curated/hoodies/11.jpeg',
            'images/curated/hoodies/12.jpeg',
        ],
        'hats': [
            'images/curated/hats/01.jpeg',
            'images/curated/hats/02.jpeg',
        ],
        'mugs': [
            'images/curated/mugs/01.jpeg',
            'images/curated/mugs/02.jpeg',
            'images/curated/mugs/03.jpeg',
        ],
        'stickers': [
            'images/curated/stickers/01.jpeg',
            'images/curated/stickers/02.jpeg',
            'images/curated/stickers/03.jpeg',
            'images/curated/stickers/04.jpeg',
            'images/curated/stickers/05.jpeg',
            'images/curated/stickers/06.jpeg',
            'images/curated/stickers/07.jpeg',
            'images/curated/stickers/08.jpeg',
            'images/curated/stickers/09.jpeg',
            'images/curated/stickers/10.jpeg',
            'images/curated/stickers/11.jpeg',
            'images/curated/stickers/12.jpeg',
        ],
        'banners': [
            'images/curated/banners/01.jpg',
            'images/curated/banners/02.jpeg',
            'images/curated/banners/03.jpeg',
            'images/curated/banners/04.jpeg',
            'images/curated/banners/05.jpeg',
            'images/curated/banners/06.jpeg',
            'images/curated/banners/07.jpeg',
            'images/curated/banners/08.jpeg',
        ],
        'business-cards': [
            'images/curated/business-cards/01.jpg',
            'images/curated/business-cards/02.jpg',
            'images/curated/business-cards/03.jpg',
            'images/curated/business-cards/04.jpg',
            'images/curated/business-cards/05.jpg',
        ],
    };

    // Categories whose curated images are 200px FB thumbnails — render as a 2x2
    // mosaic at native size instead of upscaling a single thumb to fill the panel
    // (which would look blurry). Multiple small tiles also showcase variety.
    const MOSAIC_CATEGORIES = new Set(['hoodies', 'hats', 'mugs', 'stickers', 'banners']);

    // For categories with mixed hi-res + thumb images, slice to only the hi-res
    // ones so the rotator never shows a blurry frame. (business-cards is now
    // fully hi-res after the folder-name fix, so no slicing needed.)
    const HIRES_ONLY = {};

    let images = categoryImages[category] || [];
    const hiresLimit = HIRES_ONLY[category];
    if (hiresLimit) {
        images = images.slice(0, hiresLimit);
    }

    if (images.length === 0) {
        rotator.innerHTML = '<div class="placeholder-image">📸<br>Images Loading...</div>';
        return;
    }

    if (MOSAIC_CATEGORIES.has(category)) {
        renderMosaic(rotator, images, category);
    } else {
        renderRotator(rotator, images, category);
    }

    setupImageHoverEffects();
}

function renderRotator(rotator, images, category) {
    rotator.classList.remove('mosaic');
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        img.alt = `${category} example ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        rotator.appendChild(img);
    });
    if (images.length > 1) {
        startImageRotation(rotator, images.length);
    }
}

function renderMosaic(rotator, images, category) {
    rotator.classList.add('mosaic');
    const TILE_COUNT = 4;
    const tiles = [];
    for (let i = 0; i < TILE_COUNT; i++) {
        const img = document.createElement('img');
        img.src = images[i % images.length];
        img.loading = 'lazy';
        img.alt = `${category} example ${i + 1}`;
        rotator.appendChild(img);
        tiles.push(img);
    }
    // If pool larger than visible tiles, cycle one tile every 4s through the rest
    if (images.length > TILE_COUNT) {
        let nextPoolIdx = TILE_COUNT;
        let nextTileIdx = 0;
        setInterval(() => {
            const tile = tiles[nextTileIdx];
            tile.classList.add('fading');
            setTimeout(() => {
                tile.src = images[nextPoolIdx % images.length];
                tile.classList.remove('fading');
            }, 400);
            nextPoolIdx = (nextPoolIdx + 1) % images.length;
            nextTileIdx = (nextTileIdx + 1) % TILE_COUNT;
        }, 3500);
    }
}

function startImageRotation(rotator, imageCount) {
    let currentIndex = 0;
    
    setInterval(() => {
        const images = rotator.querySelectorAll('img');
        if (images.length === 0) return;

        // Remove active class from current image
        images[currentIndex].classList.remove('active');

        // Move to next image
        currentIndex = (currentIndex + 1) % imageCount;

        // Add active class to new image
        images[currentIndex].classList.add('active');
    }, 8000); // 8 seconds for smoother experience
}

// Paint-splat background video — color cycling + lifecycle management
function initPaintSplatVideo() {
    const paintVideo = document.getElementById('paint-splat-bg');
    if (!paintVideo) return;

    function cyclePaintColors() {
        const colors = [
            'hue-rotate(0deg)',
            'hue-rotate(120deg)',
            'hue-rotate(180deg)',
            'hue-rotate(120deg)',
        ];
        const timings = [4000, 4000, 4000, 4000];
        let colorIndex = 0;

        function nextColor() {
            requestAnimationFrame(() => {
                paintVideo.style.filter = colors[colorIndex];
            });
            colorIndex = (colorIndex + 1) % colors.length;
            setTimeout(nextColor, timings[colorIndex === 0 ? 3 : colorIndex - 1]);
        }

        nextColor();
    }

    paintVideo.addEventListener('loadeddata', () => {
        setTimeout(() => {
            cyclePaintColors();
            setTimeout(() => paintVideo.pause(), 8000);
        }, 500);
    });

    paintVideo.addEventListener('ended', () => {
        paintVideo.currentTime = 0;
        paintVideo.play();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) paintVideo.pause();
        else paintVideo.play();
    });
}

document.addEventListener('DOMContentLoaded', initPaintSplatVideo);
