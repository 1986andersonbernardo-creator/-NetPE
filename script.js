// ============================================
// +Net Internet Fibra - Premium JavaScript
// Animações, Interações e Funcionalidades
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas as funcionalidades
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initCounterAnimation();
  initSmoothScroll();
  initCardAnimations();
  initMicrointeractions();
  initCarousel();
  initLazyLoading();
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Animação do botão hamburger
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Fechar menu ao clicar em um link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.estatistica-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-target');
        if (target) {
          animateCounter(entry.target, parseFloat(target));
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element, target) {
  const currentText = element.innerText;
  const hasPlus = currentText.includes('+');
  const hasPercent = currentText.includes('%');
  const hasSlash = currentText.includes('/');
  
  if (hasSlash) {
    return;
  }

  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    let displayValue;
    if (hasPercent) {
      displayValue = current.toFixed(1) + '%';
    } else if (hasPlus) {
      displayValue = '+' + Math.floor(current).toLocaleString('pt-BR');
    } else {
      displayValue = Math.floor(current).toLocaleString('pt-BR');
    }

    element.innerText = displayValue;
  }, stepDuration);
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// CARD ANIMATIONS
// ============================================
function initCardAnimations() {
  const cards = document.querySelectorAll('.card, .beneficio, .depoimento-card, .cobertura-card, .contato-card, .galeria-item, .estatistica-card');
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));
}

// ============================================
// MICROINTERACTIONS
// ============================================
function initMicrointeractions() {
  const buttons = document.querySelectorAll('button, .btn-card, .btn-primary, .btn-secondary, .btn-large, .btn-outline');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
      }
    });
  }

  // Tilt effect only on desktop (not mobile) for performance
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    const tiltCards = document.querySelectorAll('.card, .beneficio');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================
function initCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  if (!carouselContainer) return;

  const track = carouselContainer.querySelector('.carousel-track');
  const cards = track.querySelectorAll('.depoimento-card');
  const prevBtn = carouselContainer.querySelector('.carousel-prev');
  const nextBtn = carouselContainer.querySelector('.carousel-next');
  const dots = carouselContainer.querySelectorAll('.carousel-dot');

  if (cards.length === 0) return;

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 30; // card width + gap
  const totalCards = cards.length;
  const cardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  function updateCarousel() {
    const maxIndex = totalCards - cardsPerView;
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;
    
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Auto-play carousel with cleanup
  const carouselInterval = setInterval(() => {
    currentIndex++;
    updateCarousel();
  }, 5000);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(carouselInterval);
  });

  // Update on resize with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 100);
  });
}

// ============================================
// LAZY LOADING
// ============================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const optimizedScroll = debounce(() => {
  // Scroll optimizations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  const iconButtons = document.querySelectorAll('button i, a i');
  iconButtons.forEach(icon => {
    const parent = icon.parentElement;
    if (!parent.getAttribute('aria-label') && !parent.textContent.trim()) {
      const iconName = icon.classList[1]?.replace('fa-', '') || 'ícone';
      parent.setAttribute('aria-label', iconName);
    }
  });
}

initAccessibility();

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c+Net Internet Fibra', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ para alta performance', 'color: #00a2ff; font-size: 14px;');