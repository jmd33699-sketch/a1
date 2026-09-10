// AcademyVision.com - Core Interactive Systems
document.addEventListener('DOMContentLoaded', () => {
  // Reading Progress Bar
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
      }
    });
  }

  // Mobile Drawer Toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.close-drawer');

  function toggleDrawer(open) {
    if (drawer && overlay) {
      if (open) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  if (hamburger) hamburger.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
  if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const c = i.querySelector('.accordion-content');
        if (c) c.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Live Search Modal
  const searchBtn = document.querySelector('.btn-search');
  const searchModal = document.querySelector('.search-modal-backdrop');
  const searchInput = document.querySelector('#site-search-input');
  const searchResults = document.querySelector('.search-results-list');

  const searchablePages = [
    { title: 'Academic Programs & Curricula', url: '/#programs', desc: 'Undergraduate and doctoral research programs.' },
    { title: 'Pedagogical Philosophy & Ethos', url: '/about.html', desc: 'The AcademyVision institutional vision.' },
    { title: 'Research & Scholarly Labs', url: '/#research', desc: 'Faculty research and technological discovery.' },
    { title: 'Learning Analytics & Cognitive Load', url: '/blog/learning-analytics-and-cognitive-load-in-higher-education-pedagogy.html', desc: 'Psychometric analytics monograph.' },
    { title: 'Interdisciplinary Curriculum Design', url: '/blog/interdisciplinary-curriculum-design-and-faculty-silo-transcendence.html', desc: 'Breaking academic silos in higher education.' },
    { title: 'Digital Lecture Hall Pedagogy', url: '/blog/digital-lecture-hall-pedagogy-and-active-learning-interventions.html', desc: 'Active learning interventions.' },
    { title: 'Contact Academic Admissions', url: '/contact.html', desc: 'Reach our academic registry and dean office.' }
  ];

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      if (searchInput) searchInput.focus();
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
      }
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        if (query.length < 2) return;

        const filtered = searchablePages.filter(p => 
          p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          searchResults.innerHTML = '<li style="color:var(--text-muted);padding:1rem 0;">No matching academic resources found.</li>';
        } else {
          filtered.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${p.url}" style="display:block;font-weight:600;color:var(--primary);margin-bottom:0.25rem;">${p.title}</a><span style="font-size:0.85rem;color:var(--text-muted);">${p.desc}</span>`;
            searchResults.appendChild(li);
          });
        }
      });
    }
  }
});
