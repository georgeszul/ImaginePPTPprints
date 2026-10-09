<script>
    const paintVideo = document.getElementById('paint-splat-bg');
    
    // Color cycling function - Blue → Red → Yellow → Red → Blue
    function cyclePaintColors() {
        const colors = [
            'hue-rotate(0deg)',        // Blue (original)
            'hue-rotate(120deg)',      // Red
            'hue-rotate(180deg)',      // Yellow
            'hue-rotate(120deg)'       // Red (again)
        ];
        const timings = [3000, 3000, 3000, 3000];
        let colorIndex = 0;
        
        function nextColor() {
            paintVideo.style.filter = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
            setTimeout(nextColor, timings[colorIndex === 0 ? 3 : colorIndex - 1]);
        }
        
        nextColor();
    }
    
    paintVideo.addEventListener('loadeddata', () => {
        cyclePaintColors();
        
        // Pause video after 10 seconds but keep color cycling
        setTimeout(() => {
            paintVideo.pause();
            console.log('Paint splat video paused after 10 seconds, color cycling continues');
        }, 10000);
    });
    
    // Ensure video plays initially
    paintVideo.addEventListener('ended', () => {
        paintVideo.currentTime = 0;
        paintVideo.play();
    });
</script>


