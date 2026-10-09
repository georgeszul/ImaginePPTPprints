/**
 * Dynamic Price Calculator
 * Real-time pricing estimates for custom orders
 */

class PriceCalculator {
    constructor() {
        // Base prices per product type
        this.basePrices = {
            tshirt: 8.00,
            hoodie: 22.00,
            hat: 12.00,
            banner: 3.50, // per sq ft
            businesscard: 0.25, // per card
            sticker: 1.50
        };

        // Print method costs (per item)
        this.printMethodCosts = {
            screen: 2.50,
            dtg: 4.00,
            embroidery: 6.00,
            heat: 3.00,
            vinyl: 5.00
        };

        // Color multipliers
        this.colorCosts = {
            1: 0,
            2: 1.00,
            3: 2.00,
            4: 3.50
        };

        // Turnaround multipliers
        this.turnaroundMultipliers = {
            standard: 1.0,
            rush: 1.3,
            extended: 0.9
        };

        // Volume discounts (quantity threshold: discount %)
        this.volumeDiscounts = [
            { min: 100, discount: 0.15 },  // 15% off for 100+
            { min: 50, discount: 0.10 },   // 10% off for 50+
            { min: 25, discount: 0.05 }    // 5% off for 25+
        ];

        this.init();
    }

    init() {
        this.attachEventListeners();
        this.calculate(); // Initial calculation
        console.log('💰 Price Calculator initialized');
    }

    attachEventListeners() {
        const inputs = [
            'productType',
            'quantity',
            'printMethod',
            'colors',
            'turnaround',
            'designHelp'
        ];

        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.calculate());
                if (element.type === 'number') {
                    element.addEventListener('input', () => this.calculate());
                }
            }
        });
    }

    calculate() {
        // Get form values
        const productType = document.getElementById('productType').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const printMethod = document.getElementById('printMethod').value;
        const colors = parseInt(document.getElementById('colors').value);
        const turnaround = document.getElementById('turnaround').value;
        const designHelp = document.getElementById('designHelp').checked;

        // Calculate base price
        let basePrice = this.basePrices[productType] || 10;
        
        // Special handling for banners (per sq ft)
        if (productType === 'banner') {
            basePrice *= 6; // Assume 6 sq ft average
        }
        
        // Special handling for business cards (minimum 100)
        if (productType === 'businesscard') {
            const cardQty = Math.max(quantity, 100);
            basePrice = this.basePrices[productType] * cardQty;
        } else {
            basePrice *= quantity;
        }

        // Calculate print method cost
        const printCost = (this.printMethodCosts[printMethod] || 0) * quantity;

        // Calculate color cost
        const colorCost = (this.colorCosts[colors] || 0) * quantity;

        // Calculate subtotal
        let subtotal = basePrice + printCost + colorCost;

        // Apply volume discount
        const volumeDiscount = this.getVolumeDiscount(quantity);
        if (volumeDiscount > 0) {
            subtotal *= (1 - volumeDiscount);
        }

        // Apply turnaround multiplier
        const turnaroundMultiplier = this.turnaroundMultipliers[turnaround] || 1.0;
        const turnaroundCost = subtotal * (turnaroundMultiplier - 1);
        
        // Calculate total
        const total = subtotal * turnaroundMultiplier;
        const unitPrice = total / quantity;

        // Update UI
        this.updateUI({
            basePrice: basePrice,
            printCost: printCost,
            colorCost: colorCost,
            turnaroundCost: turnaroundCost,
            total: total,
            unitPrice: unitPrice,
            volumeDiscount: volumeDiscount,
            quantity: quantity
        });
    }

    getVolumeDiscount(quantity) {
        for (const tier of this.volumeDiscounts) {
            if (quantity >= tier.min) {
                return tier.discount;
            }
        }
        return 0;
    }

    updateUI(prices) {
        // Update price breakdown
        document.getElementById('basePrice').textContent = this.formatPrice(prices.basePrice);
        document.getElementById('printCost').textContent = this.formatPrice(prices.printCost);
        document.getElementById('colorCost').textContent = this.formatPrice(prices.colorCost);
        
        // Format turnaround cost (can be negative for discount)
        const turnaroundEl = document.getElementById('turnaroundCost');
        const turnaroundText = this.formatPrice(prices.turnaroundCost);
        turnaroundEl.textContent = turnaroundText;
        
        // Color code turnaround cost
        if (prices.turnaroundCost > 0) {
            turnaroundEl.style.color = '#ff6b6b';
        } else if (prices.turnaroundCost < 0) {
            turnaroundEl.style.color = '#51cf66';
        } else {
            turnaroundEl.style.color = '';
        }

        document.getElementById('totalPrice').textContent = this.formatPrice(prices.total);
        document.getElementById('unitPrice').textContent = this.formatPrice(prices.unitPrice);

        // Show volume discount notice if applicable
        if (prices.volumeDiscount > 0) {
            const discountPercent = (prices.volumeDiscount * 100).toFixed(0);
            this.showDiscountNotice(`🎉 ${discountPercent}% volume discount applied!`);
        } else {
            const nextTier = this.getNextDiscountTier(prices.quantity);
            if (nextTier) {
                const needed = nextTier.min - prices.quantity;
                const discountPercent = (nextTier.discount * 100).toFixed(0);
                this.showDiscountNotice(`💡 Order ${needed} more to save ${discountPercent}%!`);
            }
        }

        // Animate total price
        this.animatePrice(document.getElementById('totalPrice'));
    }

    getNextDiscountTier(currentQuantity) {
        for (let i = this.volumeDiscounts.length - 1; i >= 0; i--) {
            if (currentQuantity < this.volumeDiscounts[i].min) {
                return this.volumeDiscounts[i];
            }
        }
        return null;
    }

    showDiscountNotice(message) {
        let notice = document.querySelector('.volume-discount-notice');
        if (!notice) {
            notice = document.createElement('div');
            notice.className = 'volume-discount-notice';
            const discountNoticeEl = document.querySelector('.discount-notice');
            if (discountNoticeEl) {
                discountNoticeEl.appendChild(notice);
            }
        }
        notice.textContent = message;
        notice.style.display = 'block';
    }

    formatPrice(amount) {
        return '$' + Math.abs(amount).toFixed(2);
    }

    animatePrice(element) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#00b4d8';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if calculator exists on page
    if (document.getElementById('productType')) {
        new PriceCalculator();
    }
});


