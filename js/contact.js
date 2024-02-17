import "./../styles/styles.css";
import "./../styles/contact.css";
import { Shared } from './shared';
import errorMsg from './../errorMsg.json';
import { ValidAccess } from './validAccess';
import img from './../src/imagenes/loadingsmall.gif';
Shared();
(function(){
    const form = new ValidAccess({
       formId: "contactForm",
       url: 'https://reqre54s.in/api/unknown/23', 
       success: 'aaog-form-success', 
       error: 'aaog-form-error', 
       msgUrl: errorMsg,
       bannerClass: 'aaog-alert-banner',
       fieldError: 'aaog-error',
       loadingImg: img
    });   
 })();