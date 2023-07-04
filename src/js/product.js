import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/contact.css";
import "./../styles/product.css";
import { Shared } from "./shared";
Shared();
if(document.querySelector('html[lang="es"]')) {
  console.log('entró')
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-gallery',
      children: 'a',
      closeTitle: 'Cerrar diálogo',
      zoomTitle: 'Zoom de la foto',
      arrowPrevTitle: 'Ir a la foto previa',
      arrowNextTitle: 'Ir a la foto siguiente',
      returnFocus: true,
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
} else {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-gallery',
      children: 'a',
      returnFocus: true,
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
}