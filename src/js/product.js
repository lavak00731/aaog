import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import "./../styles/styles.css";
import "./../styles/contact.css";
import "./../styles/product.css";
import { ValidAccess } from './validAccess';
import { Shared } from "./shared";
import { shareProduct } from './shareProduct';
import errorMsg from './../errorMsg.json';
import { modal } from './modal';
import img from './../imagenes/loadingsmall.gif';

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
  const btnClose = document.querySelectorAll('.aaog-close-modal, .aaog-final-btn');
  const formElem = document.querySelector('form');
  const heading = document.querySelector('h1').textContent;
  const reseteableElems = document.querySelectorAll('.aaog-modal-body .aaog-overflow-hidden');
  const closeAndReset = () => {
    modalFunc.closeModal('#prodId');
      formElem.reset();
      reseteableElems.forEach((elem)=>{
        if(!elem.hasAttribute('hidden')){
          elem.setAttribute('hidden', true);
          formElem.removeAttribute('hidden');
        }
      })
  }
  btnTrigger.forEach(( btn )=>{
    btn.addEventListener('click', function(){
      modalFunc.openModal('#prodId', btn)
      formElem.querySelector('#asunto').value = heading;
    }, false);
  });
  btnClose.forEach(( btn )=>{
    btn.addEventListener('click', function(){
      closeAndReset();
    }, false);
  });
})();
(function(){
   const form = new ValidAccess({
      formId: "prodForm",
      url: 'https://reqres.in/api/users', 
      success: 'aaog-form-success', 
      error: 'aaog-form-error', 
      msgUrl: errorMsg,
      bannerClass: 'aaog-alert-banner',
      fieldError: 'aaog-error',
      loadingImg: img
   })
})();