import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/contact.css";
import "./../styles/product.css";
import { Shared } from "./shared";
import { shareProduct } from './shareProduct';
import { modal } from './modal';
Shared();
shareProduct();
if(document.querySelector('html[lang="es"]')) {
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
(function(){
  const modalFunc = modal();
  const btnTrigger = document.querySelectorAll('.aaog-modal-trigger');
  const btnClose = document.querySelectorAll('.aaog-close-modal');
  const formElem = document.querySelector('form');
  const heading = document.querySelector('h1').textContent
  btnTrigger.forEach(( btn )=>{
    btn.addEventListener('click', function(){
      modalFunc.openModal('#prodId', btn)
      formElem.querySelector('#asunto').value = heading;
    }, false);
  });
  btnClose.forEach(( btn )=>{
    btn.addEventListener('click', function(){
      modalFunc.closeModal('#prodId');
      formElem.reset()
    }, false);
  });
})()
