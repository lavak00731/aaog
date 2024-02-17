import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Shared } from './shared';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/aboutus.css";

Shared();
if(document.querySelector('html[lang="es"]')) {
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#galeria-taller',
    children: 'a',
    closeTitle: 'Cerrar diálogo',
    zoomTitle: 'Zoom de la foto',
    arrowPrevTitle: 'Ir a la foto previa',
    arrowNextTitle: 'Ir a la foto siguiente',
    returnFocus: true,
    pswpModule: () => import('photoswipe')
  });
  lightbox.init();
  
  const lightbox2 = new PhotoSwipeLightbox({
    gallery: '#restoration',
    children: 'a',
    closeTitle: 'Cerrar diálogo',
    zoomTitle: 'Zoom de la foto',
    arrowPrevTitle: 'Ir a la foto previa',
    arrowNextTitle: 'Ir a la foto siguiente',
    returnFocus: true,
    pswpModule: () => import('photoswipe')
  });
  lightbox2.init();
} else {
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#galeria-taller',
    children: 'a',
    returnFocus: true,
    pswpModule: () => import('photoswipe')
  });
  lightbox.init();
  
  const lightbox2 = new PhotoSwipeLightbox({
    gallery: '#restoration',
    children: 'a',
    returnFocus: true,
    pswpModule: () => import('photoswipe')
  });
  lightbox2.init();
}

