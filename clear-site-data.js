/**
 * Clear Site Data Script
 * Run this in your browser console to clear all cached data
 */

console.log('🧹 Starting site data cleanup...');

// Clear all service worker caches
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
            console.log('✅ Service Worker unregistered');
        }
    });
}

// Clear all caches
caches.keys().then(function(cacheNames) {
    return Promise.all(
        cacheNames.map(function(cacheName) {
            console.log('🗑️ Deleting cache:', cacheName);
            return caches.delete(cacheName);
        })
    );
}).then(function() {
    console.log('✅ All caches cleared');
});

// Clear localStorage
if (typeof(Storage) !== "undefined") {
    localStorage.clear();
    console.log('✅ localStorage cleared');
}

// Clear sessionStorage
if (typeof(Storage) !== "undefined") {
    sessionStorage.clear();
    console.log('✅ sessionStorage cleared');
}

// Clear IndexedDB
if ('indexedDB' in window) {
    indexedDB.databases().then(databases => {
        databases.forEach(db => {
            indexedDB.deleteDatabase(db.name);
            console.log('✅ IndexedDB database deleted:', db.name);
        });
    });
}

// Clear cookies (for current domain)
document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});
console.log('✅ Cookies cleared');

console.log('🎉 Site data cleanup complete!');
console.log('🔄 Please refresh the page (Ctrl+F5) to see changes');

