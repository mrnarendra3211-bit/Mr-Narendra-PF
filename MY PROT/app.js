/* ==========================================================================
   NARENDRA PRAJAPAT — Portfolio Interactivity & Script Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Modules
  initBackgroundCanvas();
  initNavigationSpy();
  initMobileDrawer();
  initGlassCardTilt();
  initDownloadResume();
});

/* ==========================================================================
   1. AMBIENT BACKGROUND PARTICLES CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Subtle Cyber Grid Overlay
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 70;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Render Cyan Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   2. NAVIGATION SCROLL SPY
   ========================================================================== */
function initNavigationSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('main-navbar');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    // Navbar Background Shadow on Scroll
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 7, 14, 0.88)';
      navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.1)';
    } else {
      navbar.style.background = 'rgba(8, 12, 22, 0.7)';
      navbar.style.boxShadow = 'var(--shadow-glass)';
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileToggle || !mobileDrawer) return;

  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('active');
  });

  drawerClose.addEventListener('click', () => {
    mobileDrawer.classList.remove('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  });
}

/* ==========================================================================
   4. GLASS CARDS SPOTLIGHT HOVER EFFECT
   ========================================================================== */
function initGlassCardTilt() {
  const cards = document.querySelectorAll('.glass-card, .bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX MODAL FUNCTIONALITY
   ========================================================================== */
function openLightbox(title, description) {
  const modal = document.getElementById('lightbox-modal');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbVisual = document.getElementById('lb-visual');

  if (!modal) return;

  lbTitle.textContent = title;
  lbDesc.textContent = description;
  lbVisual.textContent = title;

  modal.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
}

// Close Lightbox when clicking outside box
document.addEventListener('click', (e) => {
  const modal = document.getElementById('lightbox-modal');
  if (modal && e.target === modal) {
    closeLightbox();
  }
});

/* ==========================================================================
   6. CONTACT FORM SUBMISSION HANDLER
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const message = document.getElementById('form-message').value;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending Message...</span> <i data-lucide="loader-2"></i>`;
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Message Sent Successfully!</span> <i data-lucide="check"></i>`;
    if (window.lucide) window.lucide.createIcons();

    // Trigger Notification Lightbox
    openLightbox(
      `Thank You, ${name}!`,
      `Your message has been received. Narendra Prajapat will get back to you shortly at ${email}.`
    );

    // Reset Form
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }, 4000);
  }, 1200);
}

/* ==========================================================================
   7. RESUME DOWNLOAD TRIGGER
   ========================================================================== */
function initDownloadResume() {
  const btn = document.getElementById('download-resume-btn');
  if (btn) {
    btn.addEventListener('click', triggerResumeDownload);
  }
}

function triggerResumeDownload() {
  openLightbox(
    "Narendra Prajapat — Resume",
    "BCA AIML Student at University of Engineering & Management, Jaipur | Full-Stack Web Developer & AI Enthusiast. Resume document download initiated."
  );
}
