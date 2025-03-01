 // Enhanced Toggle Function with Animation
function toggleRecipe(recipeId) {
  const recipeDetails = document.getElementById(recipeId);
  const button = document.querySelector(`[onclick="toggleRecipe('${recipeId}')"]`);
  
  // Toggle with animation
  if (recipeDetails.style.maxHeight) {
      recipeDetails.style.maxHeight = null;
      button.innerHTML = '<i class="fas fa-chevron-down"></i> Show Details';
  } else {
      recipeDetails.style.maxHeight = recipeDetails.scrollHeight + "px";
      button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
  }
  
  // Add transition class
  recipeDetails.classList.toggle('active');
}

// Enhanced Category Filter with Animation
document.querySelectorAll('.category-filter button').forEach(button => {
  button.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.category-filter button').forEach(btn => {
          btn.classList.remove('active');
          btn.style.transform = 'scale(1)';
      });

      // Add active state to clicked button
      button.classList.add('active');
      button.style.transform = 'scale(1.05)';

      // Get selected category
      const category = button.dataset.category;
      const cards = document.querySelectorAll('.recipe-card');
      
      // Animate cards
      cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                  card.style.display = 'block';
                  requestAnimationFrame(() => {
                      card.style.opacity = '1';
                      card.style.transform = 'translateY(0)';
                  });
              }, 200);
          } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(-20px)';
              setTimeout(() => {
                  card.style.display = 'none';
              }, 200);
          }
      });
  });
});

// Initialize default state
document.querySelector('.category-filter button[data-category="all"]').click();

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          window.scrollTo({
              top: target.offsetTop - 80, // Account for fixed header
              behavior: 'smooth'
          });
      }
  });
});

// Search Functionality
document.querySelector('.search-input').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  document.querySelectorAll('.recipe-card').forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
});


// Enhanced Card Interactions
document.querySelectorAll('.recipe-card').forEach(card => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Swipe functionality
  card.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - card.offsetLeft;
      scrollLeft = card.scrollLeft;
  });

  card.addEventListener('mouseleave', () => {
      isDragging = false;
  });

  card.addEventListener('mouseup', () => {
      isDragging = false;
  });

  card.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - card.offsetLeft;
      const walk = (x - startX) * 2;
      card.scrollLeft = scrollLeft - walk;
  });

  // Keyboard navigation
  card.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          const details = card.querySelector('.recipe-details');
          details.classList.toggle('active');
          card.querySelector('.show-hide-btn').click();
      }
  });
});

 

// Add this to your existing JavaScript file
document.querySelectorAll('.recipe-card').forEach(card => {
  // Get YouTube URL from data attribute
  const youtubeUrl = card.dataset.video;
  
  // Create video link element
  const videoLink = document.createElement('a');
  videoLink.className = 'video-link';
  
  if(youtubeUrl) {
      // If video exists
      videoLink.href = youtubeUrl;
      videoLink.target = "_blank";
      videoLink.innerHTML = `
          <i class="fab fa-youtube"></i> Watch Video Tutorial
      `;
  } else {
      // If no video available
      videoLink.style.cursor = "not-allowed";
      videoLink.innerHTML = `
          <i class="fas fa-video-slash"></i> Video Coming Soon
      `;
  }
  
  // Add the video link after recipe details
  const detailsSection = card.querySelector('.card-details');
  detailsSection.appendChild(videoLink);
});