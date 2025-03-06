
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const setupMobileMenu = () => {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // Check if mobile menu button already exists
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
      // Create mobile menu button
      mobileMenuBtn = document.createElement('div');
      mobileMenuBtn.classList.add('mobile-menu-btn');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      // Insert button after logo
      const logo = document.querySelector('.logo');
      if (logo && logo.nextSibling) {
        header.insertBefore(mobileMenuBtn, logo.nextSibling);
      } else {
        header.appendChild(mobileMenuBtn);
      }
    }
    
    // Add click event
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      if (nav.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  };
  
  // Check if screen width is less than 768px
  if (window.innerWidth < 768) {
    setupMobileMenu();
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      setupMobileMenu();
    } else {
      // Remove active class when viewport becomes larger
      document.querySelector('nav')?.classList.remove('active');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.querySelector('.mobile-menu-btn').classList.remove('active');
        }
      }
    });
  });
  
  // Property filtering functionality
  const setupPropertyFiltering = () => {
    const searchButton = document.querySelector('.search-bar button');
    if (!searchButton) return;
    
    searchButton.addEventListener('click', function() {
      // Get filter values
      const location = document.querySelector('.search-bar input').value.toLowerCase();
      const propertyType = document.querySelector('.search-bar select:nth-of-type(1)').value;
      const priceRange = document.querySelector('.search-bar select:nth-of-type(2)').value;
      
      // Simple alert for demo purposes
      alert(`Searching for ${propertyType || 'any property'} in ${location || 'any location'} with price range: ${priceRange || 'any'}`);
      
      // In a real application, you would filter the properties or redirect to a search results page
    });
  };
  
  setupPropertyFiltering();
  
  // Active navigation highlighting
  const highlightActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      let scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
          document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.remove('active');
        }
      });
    });
  };
  
  highlightActiveNav();
  
  // Form validation
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Form submission simulation
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Newsletter subscription
  const newsletterForm = document.querySelector('.footer-newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input').value;
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    });
  }
});

// Load more properties functionality
const setupLoadMoreProperties = () => {
  const viewAllBtn = document.querySelector('.view-all .btn');
  if (!viewAllBtn) return;
  
  // Initially show only 6 properties
  let visibleProperties = 6;
  
  viewAllBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // If we're showing all properties, reset to 6
    if (visibleProperties >= properties.length) {
      visibleProperties = 6;
      document.querySelectorAll('.property-card').forEach((card, index) => {
        if (index >= visibleProperties) {
          card.style.display = 'none';
        }
      });
      this.textContent = 'View All Properties';
    } else {
      // Otherwise show all properties
      visibleProperties = properties.length;
      document.querySelectorAll('.property-card').forEach(card => {
        card.style.display = 'block';
      });
      this.textContent = 'Show Less';
    }
  });
};

// Property image hover effect
const setupPropertyHoverEffects = () => {
  const propertyCards = document.querySelectorAll('.property-card');
  propertyCards.forEach(card => {
    const img = card.querySelector('.property-image img');
    
    card.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.1)';
      img.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
};

// Setup scroll to top button
const setupScrollToTop = () => {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  if (!scrollToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('active');
    } else {
      scrollToTopBtn.classList.remove('active');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Call all setup functions
document.addEventListener('DOMContentLoaded', function() {
  setupPropertyHoverEffects();
  setupLoadMoreProperties();
  setupScrollToTop();
});
