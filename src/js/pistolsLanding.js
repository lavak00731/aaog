import "./../styles/styles.css";
import "./../styles/products.css";
import "./../styles/contact.css";
import "./../styles/productLanding.css";
import { Shared } from "./shared";
import { addListForFilteringByName, filterByName, resetSearch, addFilterByFeature, filterByFeature } from './filters';
Shared();
addListForFilteringByName('pistolsandrifles', 'pist');
addFilterByFeature('pistolsandrifles')
const productList = document.querySelectorAll('.aaog-product-wrapper');
const searchTrigger = document.querySelector('#searchTrigger');
const inputElem = document.querySelector('#inputSearch');
const featureTrigger = document.querySelectorAll('input[type="radio"]')
searchTrigger.addEventListener('click', (e)=>{ 
    if(inputElem.value.length > 0) {
        filterByName(inputElem.value, productList);
    } 
}, false);
inputElem.addEventListener('input', ()=>resetSearch(productList), false);
featureTrigger.forEach((feature)=>{
    feature.addEventListener('change', (e)=> filterByFeature(e.target.value, productList), false)
})


