// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Intercepting Get Started Router
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Ensure storage.js functions are loaded
      if (typeof getUserProfile === 'function') {
        const prof = getUserProfile();
        if (prof && prof.selectedGoal) {
          window.location.href = 'dashboard.html';
        } else {
          window.location.href = 'profile-setup.html';
        }
      } else {
        // Fallback
        window.location.href = 'profile-setup.html';
      }
    });
  }
});
