const menuButton = document.querySelector('[data-menu]');
const navigation = document.querySelector('[data-nav]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

document.querySelectorAll('.faqbutton').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faqitem');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    const icon = button.querySelector('[aria-hidden="true"]');
    if (icon) icon.textContent = open ? '−' : '+';
  });
});

document.querySelectorAll('[data-gallery-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('aria-controls');
    const content = document.getElementById(targetId);
    if (!content) return;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    content.hidden = open;
    const action = button.querySelector('.gallery-action');
    if (action) {
      action.textContent = open ? action.dataset.openLabel : action.dataset.closeLabel;
    }
  });
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', document.documentElement.lang.startsWith('es') ? 'Imagen ampliada' : 'Expanded image');
lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="${document.documentElement.lang.startsWith('es') ? 'Cerrar imagen' : 'Close image'}">×</button>
  <div class="lightbox-dialog">
    <img alt="" />
    <p class="lightbox-caption"></p>
  </div>`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.classList.remove('lightbox-open');
  lightboxImage.removeAttribute('src');
};

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    lightboxImage.src = link.href;
    lightboxImage.alt = link.querySelector('img')?.alt || '';
    lightboxCaption.textContent = link.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  });
});

const WHATSAPP_NUMBER = '16084262849';
document.querySelectorAll('[data-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const spanish = document.documentElement.lang.toLowerCase().startsWith('es');
    const lines = spanish
      ? [
          'Hola, quiero solicitar una cotización con Tri State Drive Fix.',
          `Nombre: ${data.get('name') || ''}`,
          `Ciudad / ZIP: ${data.get('area') || ''}`,
          `Vehículo: ${data.get('vehicle') || ''}`,
          `Servicio o problema: ${data.get('service') || ''}`,
          `Detalles: ${data.get('details') || ''}`
        ]
      : [
          'Hello, I would like an estimate from Tri State Drive Fix.',
          `Name: ${data.get('name') || ''}`,
          `City / ZIP: ${data.get('area') || ''}`,
          `Vehicle: ${data.get('vehicle') || ''}`,
          `Service or problem: ${data.get('service') || ''}`,
          `Details: ${data.get('details') || ''}`
        ];
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener');
  });
});

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
