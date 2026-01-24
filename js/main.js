/**
 * Add Philia - メインJavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * ヘッダーのスクロール処理
 */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  const updateHeader = () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

/**
 * モバイルメニューの開閉
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('is-open');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // メニュー外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

/**
 * スクロールアニメーション
 */
function initScrollAnimations() {
  // prefers-reduced-motion を尊重
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // セクションにアニメーションクラスを追加
  const sections = document.querySelectorAll(
    '.concept, .activities-highlight, .latest-works, .cta-section'
  );
  
  sections.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });

  // カードにスタガーアニメーション
  const cards = document.querySelectorAll('.activity-card, .work-card');
  cards.forEach((card, index) => {
    card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    card.classList.add('animate-on-scroll', 'animate-stagger');
    observer.observe(card);
  });
}

/**
 * スムーススクロール
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 言語切替（将来の拡張用）
 */
function toggleLanguage() {
  // TODO: 言語切替の実装
  console.log('Language toggle clicked');
}
