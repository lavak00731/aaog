import "./../styles/styles.css";
import "./../styles/products.css";
import "./../styles/contact.css";
import "./../styles/productLanding.css";
import { Shared } from "./shared";
import { addFilterByFeature, filterByFeature, resetFilterByFeature } from './filters';
Shared();
addFilterByFeature('pistolsandrifles')
const productList = document.querySelectorAll('.aaog-product-wrapper');
const featureTrigger = document.querySelectorAll('input[type="radio"]');
const resetTrigger = document.querySelector('#resetTrigger');
resetTrigger.addEventListener('click', () => resetFilterByFeature(productList), false);
featureTrigger.forEach((feature)=>{
    feature.addEventListener('change', (e)=> filterByFeature(e.target.value, productList), false)
});