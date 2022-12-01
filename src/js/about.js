import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/aboutus.css";

const lightbox = new PhotoSwipeLightbox({
  gallery: '.aaog-gallery',
  children: 'a',
  pswpModule: () => import('photoswipe')
});
lightbox.init();


function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('./../imagenes/', true, /\.(png|jpeg|jpg|svg)$/));
  console.log(images);

