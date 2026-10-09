/**
 * Clear Service Worker Cache
 * Run this in browser console to clear cached content
 */

// Clear all service worker caches
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
            console.log('Service Worker unregistered');
        }
    });
}

// Clear all caches
caches.keys().then(function(cacheNames) {
    return Promise.all(
        cacheNames.map(function(cacheName) {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
        })
    );
}).then(function() {
    console.log('All caches cleared');
});

// Clear browser cache
if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(function(estimate) {
        console.log('Storage used:', estimate.usage);
    });
}

console.log('Service Worker cache clearing complete!');

