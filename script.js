// thank you chatgpt <3
  document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.portfolio-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  });
