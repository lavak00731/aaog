import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Shared } from './shared';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/aboutus.css";

Shared();
const lightbox = new PhotoSwipeLightbox({
  gallery: '#galeria-taller',
  children: 'a',
  pswpModule: () => import('photoswipe')
});
lightbox.init();

const lightbox2 = new PhotoSwipeLightbox({
  gallery: '#restoration',
  children: 'a',
  pswpModule: () => import('photoswipe')
});
lightbox2.init();

