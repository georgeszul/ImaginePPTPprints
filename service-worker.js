/**
 * Service Worker - Offline Caching & Performance
 * Imagine PPTP Prints
 */

const CACHE_NAME = 'imaginepptp-v1';
const CACHE_ASSETS = [
    '/ImaginePPTPprints/',
    '/ImaginePPTPprints/index.php',
    '/ImaginePPTPprints/about.php',
    '/ImaginePPTPprints/services.php',
    '/ImaginePPTPprints/portfolio.php',
    '/ImaginePPTPprints/contact.php',
    '/ImaginePPTPprints/css/main.css',
    '/ImaginePPTPprints/assets/css/enhanced.css',
    '/ImaginePPTPprints/assets/css/visual-enhancements.css',
    '/ImaginePPTPprints/js/main.js',
    '/ImaginePPTPprints/assets/js/main.js',
    '/ImaginePPTPprints/images/mainLogo.jpg',
    '/ImaginePPTPprints/images/favicon.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version or fetch from network
                return cachedResponse || fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseToCache = response.clone();
                        
                        // Cache images and static assets only
                        if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js)$/i)) {
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback
                        if (event.request.destination === 'image') {
                            return caches.match('/ImaginePPTPprints/images/favicon.svg');
                        }
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncFormSubmissions());
    }
});

async function syncFormSubmissions() {
    // Get pending form submissions from IndexedDB
    const submissions = await getPendingSubmissions();
    
    for (const submission of submissions) {
        try {
            const response = await fetch('/ImaginePPTPprints/api/submit-contact.php', {
                method: 'POST',
                body: submission.data
            });
            
            if (response.ok) {
                await removePendingSubmission(submission.id);
            }
        } catch (error) {
            console.error('Failed to sync submission:', error);
        }
    }
}

// Helper functions for IndexedDB
async function getPendingSubmissions() {
    // TODO: Implement IndexedDB retrieval
    return [];
}

async function removePendingSubmission(id) {
    // TODO: Implement IndexedDB removal
}




