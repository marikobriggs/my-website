// ── filtering ──────────────────────────────────────
let activeMedium = 'all';

const tabs       = document.querySelectorAll('.tab');
const sections   = document.querySelectorAll('.medium-section');
const allItems   = document.querySelectorAll('.item');
const emptyState = document.querySelector('.empty-state');
const filterBar  = document.querySelector('.filter-bar');

function applyFilters() {
  // fade out all visible items
  allItems.forEach(item => { if (!item.classList.contains('hidden')) item.classList.add('fading'); });

  setTimeout(() => {
    let anyVisible = false;
    sections.forEach(section => {
      const visible = activeMedium === 'all' || activeMedium === section.dataset.section;
      section.style.display = visible ? '' : 'none';
      if (visible) anyVisible = true;
    });
    emptyState.classList.toggle('visible', !anyVisible);

    // fade back in
    allItems.forEach(item => item.classList.remove('fading'));
  }, 160);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeMedium = tab.dataset.medium;
    applyFilters();
  });
});

// scroll shadow on filter bar
window.addEventListener('scroll', () => {
  filterBar.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// ── series badges ──────────────────────────────────
document.querySelectorAll('.item[data-images]').forEach(item => {
  const images = JSON.parse(item.dataset.images);
  if (images.length > 1) {
    const badge = document.createElement('span');
    badge.className = 'series-badge';
    badge.textContent = images.length + ' images';
    item.querySelector('.item-img').appendChild(badge);
  }
});

// ── lightbox ───────────────────────────────────────
const lightbox  = document.getElementById('lightbox');
const lbImg     = lightbox.querySelector('#lightbox-img-wrap img');
const lbTitle   = document.getElementById('lb-title');
const lbInfo    = document.getElementById('lb-info');
const lbDesc    = document.getElementById('lb-desc');
const lbCounter = document.getElementById('lb-counter');
const lbClose   = document.getElementById('lightbox-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

let currentImages = [];
let currentIndex  = 0;

function showImage(index) {
  currentIndex = index;
  lbImg.src = currentImages[index];
  const total = currentImages.length;
  lbCounter.textContent = total > 1 ? (index + 1) + ' / ' + total : '';
  lbPrev.classList.toggle('hidden', total <= 1 || index === 0);
  lbNext.classList.toggle('hidden', total <= 1 || index === total - 1);
}

function showPrev() { if (currentIndex > 0) showImage(currentIndex - 1); }
function showNext() { if (currentIndex < currentImages.length - 1) showImage(currentIndex + 1); }

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    const raw = item.dataset.images;
    currentImages = raw ? JSON.parse(raw) : [item.querySelector('img').src];

    lbTitle.textContent = item.dataset.title || '';
    lbInfo.textContent  = item.dataset.info  || '';
    lbDesc.textContent  = item.dataset.desc  || '';

    showImage(0);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lbPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
lbNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// swipe support (mobile)
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 48) diff > 0 ? showNext() : showPrev();
});
