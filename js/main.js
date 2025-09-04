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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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
    // Customize this function based on your needs
    console.log('Searching for:', query);
    
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

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Enhanced hover effects for rotating images
function setupImageHoverEffects() {
    console.log('Setting up enhanced hover effects for images...');
    
    // Add hover effects to all rotating images
    const images = document.querySelectorAll('.image-rotator img');
    console.log('Found rotating images:', images.length);
    
    images.forEach((img, index) => {
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
        
        console.log(`Added hover effects to image ${index + 1}:`, img.src);
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

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
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
    // Define image paths for each category
    const categoryImages = {
        'tshirts': [
            'images/tshirts/539738239_122202396998293236_2183067847999368314_n.jpg',
            'images/tshirts/515501507_122198526200293236_7607457180543503991_n.jpg',
            'images/tshirts/526524609_122198365964293236_9110283145285838337_n.jpg',
            'images/tshirts/527979919_122199178190293236_5235865814956008456_n.jpg',
            'images/tshirts/528375755_122199177968293236_175638541641193936_n.jpg'
        ],
        'hoodies': [
            'images/hoodies/539634838_122202397106293236_2065046746168162236_n.jpg',
            'images/tshirts/536272747_122202396872293236_4789949311103324035_n.jpg',
            'images/tshirts/536272747_122202396902293236_7950217503672986740_n.jpg',
            'images/tshirts/536272764_122202397574293236_8296046152295572766_n.jpg',
            'images/tshirts/536273428_122202396704293236_4522561417970752719_n.jpg'
        ],
        'business-cards': [
            'images/business-cards/539586768_122202396788293236_2819796790172946060_n.jpg',
            'images/tshirts/536268068_122202402710293236_6046720143165808036_n.jpg',
            'images/tshirts/536268117_122202397010293236_2058466867356444882_n.jpg',
            'images/tshirts/536268491_122202402668293236_8113688650266670840_n.jpg'
        ],
        'stickers': [
            'images/tshirts/536270882_122202397520293236_7105880321075647519_n.jpg',
            'images/tshirts/536283035_122202397160293236_4155407478648893138_n.jpg',
            'images/tshirts/536284750_122202402566293236_1502887189542089323_n.jpg'
        ],
        'mugs': [
            'images/tshirts/536274150_122202402422293236_6376054713154628511_n.jpg',
            'images/tshirts/536276688_122202396734293236_3101851942421334847_n.jpg',
            'images/tshirts/536276805_122202396914293236_4210882850675972293_n.jpg'
        ],
        'banners': [
            'images/tshirts/538700448_122202402572293236_3868410749720602649_n.jpg',
            'images/tshirts/538958290_122202397490293236_2227702217652836018_n.jpg',
            'images/tshirts/538987215_122202396896293236_6434286786111045305_n.jpg'
        ]
    };

    const images = categoryImages[category] || [];
    
    if (images.length === 0) {
        // Fallback to placeholder
        rotator.innerHTML = '<div class="placeholder-image">📸<br>Images Loading...</div>';
        return;
    }

    // Create image elements
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${category} example ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        
        rotator.appendChild(img);
    });

    // Start rotation if multiple images
    if (images.length > 1) {
        startImageRotation(rotator, images.length);
    }

    // Setup enhanced hover effects for the new images
    setupImageHoverEffects();
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
