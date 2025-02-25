
  document.addEventListener('DOMContentLoaded', function () {
    const bubblesContainer = document.querySelector('.bubble-container ');

    for (let i = 0; i < 50; i++) { // Increased number for subtle, spread-out effect
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');

      // Random position and small size
      const size = Math.random() * 10 + 5; // Size between 5px and 15px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 10 + 8}s`; // Slow rise

      bubblesContainer.appendChild(bubble);
    }
  });
