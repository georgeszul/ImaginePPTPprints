/**
 * Marquee Image Uniqueness Validator
 * Ensures no duplicate images appear in the marquee
 */

document.addEventListener('DOMContentLoaded', function() {
    validateMarqueeImages();
});

function validateMarqueeImages() {
    console.log('=== MARQUEE VALIDATION STARTED ===');
    
    const marqueeItems = document.querySelectorAll('.marquee-item img');
    const imageMap = new Map(); // Track image sources and their counts
    const duplicates = [];
    let uniqueCount = 0;
    
    // Collect all image sources
    marqueeItems.forEach((img, index) => {
        const src = img.getAttribute('src');
        
        if (!imageMap.has(src)) {
            imageMap.set(src, []);
            uniqueCount++;
        }
        
        imageMap.get(src).push({
            element: img,
            index: index,
            parent: img.closest('.marquee-item')
        });
    });
    
    // Identify duplicates
    imageMap.forEach((occurrences, src) => {
        if (occurrences.length > 1) {
            // Allow duplicates for seamless loop (second set)
            // But flag if same image appears more than twice
            if (occurrences.length > 2) {
                duplicates.push({
                    src: src,
                    count: occurrences.length,
                    occurrences: occurrences
                });
            }
        }
    });
    
    // Log results
    console.log(`📊 Marquee Statistics:`);
    console.log(`   Total marquee items: ${marqueeItems.length}`);
    console.log(`   Unique images: ${uniqueCount}`);
    console.log(`   Duplicate images: ${duplicates.length}`);
    
    if (duplicates.length > 0) {
        console.warn('⚠️  DUPLICATES DETECTED:');
        duplicates.forEach((dup, index) => {
            console.warn(`   ${index + 1}. "${dup.src}" appears ${dup.count} times`);
            console.warn(`      Positions: ${dup.occurrences.map(o => o.index).join(', ')}`);
        });
        
        // Optionally hide duplicates beyond the second occurrence
        if (confirm('Duplicate images detected in marquee. Would you like to hide them?')) {
            removeDuplicates(duplicates);
        }
    } else {
        console.log('✅ All marquee images are unique (excluding seamless loop duplicates)');
    }
    
    // Validate that first half matches second half (for seamless loop)
    validateSeamlessLoop(marqueeItems);
}

function removeDuplicates(duplicates) {
    let removedCount = 0;
    
    duplicates.forEach(dup => {
        // Keep first 2 occurrences (original + loop), remove the rest
        dup.occurrences.slice(2).forEach(occurrence => {
            occurrence.parent.style.display = 'none';
            occurrence.parent.setAttribute('data-duplicate', 'true');
            removedCount++;
        });
    });
    
    console.log(`✅ Removed ${removedCount} duplicate images`);
}

function validateSeamlessLoop(marqueeItems) {
    const row1Items = document.querySelectorAll('.marquee-row-1 .marquee-item img');
    const row2Items = document.querySelectorAll('.marquee-row-2 .marquee-item img');
    
    console.log('\n🔄 Seamless Loop Validation:');
    console.log(`   Row 1: ${row1Items.length} items`);
    console.log(`   Row 2: ${row2Items.length} items`);
    
    // Check if first half matches second half (for infinite loop effect)
    if (row1Items.length % 2 === 0) {
        const halfLength = row1Items.length / 2;
        let mismatchCount = 0;
        
        for (let i = 0; i < halfLength; i++) {
            const firstHalfSrc = row1Items[i].getAttribute('src');
            const secondHalfSrc = row1Items[i + halfLength].getAttribute('src');
            
            if (firstHalfSrc !== secondHalfSrc) {
                mismatchCount++;
            }
        }
        
        if (mismatchCount === 0) {
            console.log('   ✅ Row 1 loop is properly configured');
        } else {
            console.warn(`   ⚠️  Row 1 has ${mismatchCount} mismatches in seamless loop`);
        }
    }
    
    if (row2Items.length % 2 === 0) {
        const halfLength = row2Items.length / 2;
        let mismatchCount = 0;
        
        for (let i = 0; i < halfLength; i++) {
            const firstHalfSrc = row2Items[i].getAttribute('src');
            const secondHalfSrc = row2Items[i + halfLength].getAttribute('src');
            
            if (firstHalfSrc !== secondHalfSrc) {
                mismatchCount++;
            }
        }
        
        if (mismatchCount === 0) {
            console.log('   ✅ Row 2 loop is properly configured');
        } else {
            console.warn(`   ⚠️  Row 2 has ${mismatchCount} mismatches in seamless loop`);
        }
    }
    
    console.log('=== MARQUEE VALIDATION COMPLETE ===\n');
}

// Export for use in other scripts
window.marqueeValidator = {
    validate: validateMarqueeImages,
    removeDuplicates: removeDuplicates
};


