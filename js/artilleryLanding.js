import "./../styles/styles.css";
import "./../styles/products.css";
import "./../styles/contact.css";
import "./../styles/productLanding.css";
import { Shared } from "./shared";
import { addFilterByFeature, filterByFeature, resetFilterByFeature } from './filters';
Shared();
addFilterByFeature('artillery');
const productList = document.querySelectorAll('.aaog-product-wrapper');
const featureTrigger = document.querySelectorAll('input[type="radio"]');
const resetTrigger = document.querySelector('#resetTrigger');
const filter = document.querySelector('#filterTrigger');
let filterValue;
resetTrigger.addEventListener('click', () => {
    resetFilterByFeature(productList);
    filterValue = null;
}, false);
featureTrigger.forEach((feature)=>{
    feature.addEventListener('change', (e)=> filterValue = e.target.value, false)
});
filter.addEventListener('click', () => {
    if(filterValue) {
        filterByFeature(filterValue, productList)
    }
}, false)