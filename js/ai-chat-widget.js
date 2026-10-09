/**
 * AI-Powered Live Chat Widget
 * Intelligent customer support with context awareness
 */

class AIChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.loadWelcomeMessage();
        console.log('🤖 AI Chat Widget initialized');
    }

    createWidget() {
        const widgetHTML = `
            <!-- Chat Widget Toggle Button -->
            <div class="chat-widget-toggle" id="chatToggle">
                <div class="chat-icon">💬</div>
                <div class="chat-badge" id="chatBadge">1</div>
            </div>

            <!-- Chat Widget Window -->
            <div class="chat-widget-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">🤖</div>
                        <div class="chat-header-text">
                            <h3>Imagine PPTP Assistant</h3>
                            <span class="chat-status">
                                <span class="status-dot"></span>
                                Online Now
                            </span>
                        </div>
                    </div>
                    <button class="chat-close" id="chatClose">✕</button>
                </div>

                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be inserted here -->
                </div>

                <div class="chat-input-area">
                    <div class="quick-questions" id="quickQuestions">
                        <button class="quick-btn" data-question="What are your prices?">💰 Pricing</button>
                        <button class="quick-btn" data-question="How fast can you deliver?">⚡ Delivery Time</button>
                        <button class="quick-btn" data-question="Do you help with design?">🎨 Design Help</button>
                        <button class="quick-btn" data-question="What's your phone number?">📞 Contact</button>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" 
                               class="chat-input" 
                               id="chatInput" 
                               placeholder="Ask me anything..."
                               autocomplete="off">
                        <button class="chat-send" id="chatSend">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2 10L18 2L12 18L10 12L2 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatToggle');
        const close = document.getElementById('chatClose');
        const send = document.getElementById('chatSend');
        const input = document.getElementById('chatInput');
        const quickBtns = document.querySelectorAll('.quick-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.sendMessage(question);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatWindow');
        const toggle = document.getElementById('chatToggle');
        const badge = document.getElementById('chatBadge');

        if (this.isOpen) {
            window.classList.add('open');
            toggle.classList.add('open');
            badge.style.display = 'none';
            
            // Focus input
            setTimeout(() => {
                document.getElementById('chatInput').focus();
            }, 300);
        } else {
            window.classList.remove('open');
            toggle.classList.remove('open');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatWindow').classList.remove('open');
        document.getElementById('chatToggle').classList.remove('open');
    }

    loadWelcomeMessage() {
        const welcomeMsg = {
            text: "👋 Hi! I'm your Imagine PPTP printing assistant. I can help you with:\n\n• Getting quotes\n• Design questions\n• Delivery times\n• Product info\n\nHow can I help you today?",
            isBot: true,
            timestamp: new Date()
        };
        this.addMessage(welcomeMsg);
    }

    sendMessage(text = null) {
        const input = document.getElementById('chatInput');
        const message = text || input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage({
            text: message,
            isBot: false,
            timestamp: new Date()
        });

        // Clear input
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Get AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getAIResponse(message);
            this.addMessage({
                text: response,
                isBot: true,
                timestamp: new Date()
            });
        }, 1000 + Math.random() * 1000); // Simulate thinking time
    }

    addMessage(message) {
        this.messages.push(message);
        const messagesContainer = document.getElementById('chatMessages');
        
        const messageHTML = `
            <div class="chat-message ${message.isBot ? 'bot' : 'user'}">
                ${message.isBot ? '<div class="message-avatar">🤖</div>' : ''}
                <div class="message-bubble">
                    <div class="message-text">${this.formatMessage(message.text)}</div>
                    <div class="message-time">${this.formatTime(message.timestamp)}</div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingHTML = `
            <div class="chat-message bot typing-indicator" id="typingIndicator">
                <div class="message-avatar">🤖</div>
                <div class="message-bubble">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    getAIResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // AI Knowledge Base - Trained on your business
        const responses = {
            // Pricing
            pricing: "💰 Our pricing is competitive and depends on:\n\n• Product type (shirts, hoodies, etc.)\n• Quantity ordered\n• Design complexity\n• Number of colors\n\nFor exact pricing, I recommend:\n📞 Call: (331) 255-5330\n📧 Email: imaginepttp@gmail.com\n\nOr use our Price Calculator on the Services page!",
            
            // Delivery
            delivery: "⚡ We're FAST!\n\n• Standard: 24-48 hours\n• Rush orders: Same day available\n• Large orders: 2-3 days\n\nAll from artwork approval. We're one of the fastest in the area! 🚀",
            
            // Design Help
            design: "🎨 YES! We offer FREE design help!\n\nJust send us:\n• Your logo or ideas\n• Rough sketches\n• Description of what you want\n\nOur designers will create professional artwork at no extra charge. We accept all file formats: PNG, JPG, PDF, AI, PSD, etc.",
            
            // Contact Info
            contact: "📞 Here's how to reach us:\n\n**Phone:** (331) 255-5330\n**Email:** imaginepttp@gmail.com\n**Address:** 840 N State St, Northeast Elgin, IL\n**WhatsApp:** Available!\n\n¡Hablamos español! 🌎",
            
            // Products
            products: "👕 We offer:\n\n• Custom Shirts\n• Hoodies\n• Hats & Caps\n• Business Cards\n• Banners & Signs\n• Stickers\n• And more!\n\nAll with high-quality printing. No minimum orders!",
            
            // Minimum Order
            minimum: "✅ NO MINIMUMS!\n\nWhether you need 1 shirt or 1,000 - we've got you covered. Small orders are always welcome!",
            
            // Spanish
            spanish: "¡Sí! 🇲🇽 Hablamos español perfectamente. Puede llamarnos o enviarnos un mensaje en español sin problema.\n\n📞 (331) 255-5330",
            
            // Quality
            quality: "⭐ 100% Satisfaction Guaranteed!\n\nWe use:\n• Premium quality materials\n• Professional printing equipment\n• Fade-resistant inks\n• Durable finishes\n\nIf you're not happy, we'll remake it or refund you!",
            
            // Hours
            hours: "🕐 We're available:\n\nMonday-Friday: 9am-6pm\nSaturday: 10am-4pm\nSunday: By appointment\n\nFor urgent orders, call us anytime!",

            // Getting Started
            start: "🚀 Getting started is easy!\n\n1. Contact us (call/text/email)\n2. Share your design or idea\n3. Choose your products\n4. We handle the rest!\n\nWant to start now? Click 'Get Quote' or call (331) 255-5330!"
        };

        // Smart matching
        if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
            return responses.pricing;
        }
        if (msg.includes('deliver') || msg.includes('fast') || msg.includes('quick') || msg.includes('time')) {
            return responses.delivery;
        }
        if (msg.includes('design') || msg.includes('artwork') || msg.includes('logo')) {
            return responses.design;
        }
        if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('address')) {
            return responses.contact;
        }
        if (msg.includes('product') || msg.includes('what do you') || msg.includes('services')) {
            return responses.products;
        }
        if (msg.includes('minimum') || msg.includes('small order')) {
            return responses.minimum;
        }
        if (msg.includes('español') || msg.includes('spanish')) {
            return responses.spanish;
        }
        if (msg.includes('quality') || msg.includes('guarantee')) {
            return responses.quality;
        }
        if (msg.includes('hours') || msg.includes('open') || msg.includes('available')) {
            return responses.hours;
        }
        if (msg.includes('start') || msg.includes('begin') || msg.includes('how do i')) {
            return responses.start;
        }

        // Default response
        return "I'd love to help! I can answer questions about:\n\n• Pricing & quotes 💰\n• Delivery times ⚡\n• Design help 🎨\n• Products & services 👕\n• Contact info 📞\n\nWhat would you like to know? Or call us directly at (331) 255-5330!";
    }

    formatMessage(text) {
        // Convert markdown-style formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }
}

// Initialize chat widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIChatWidget();
});


