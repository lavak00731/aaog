import "./../styles/styles.css";
import "./../styles/products.css";
import "./../styles/productLanding.css";
import { Shared } from "./shared";
import { addListForFilteringByName, filterByName, resetSearch } from './filters';
Shared();
addListForFilteringByName('pistolsandrifles', 'pist');

const productList = document.querySelectorAll('.aaog-product-wrapper');
const searchTrigger = document.querySelector('#searchTrigger');
const inputElem = document.querySelector('#inputSearch');
searchTrigger.addEventListener('click', (e)=>{ 
    if(inputElem.value.length > 0) {
        filterByName(inputElem.value, productList);
    } 
}, false);
inputElem.addEventListener('input', ()=>resetSearch(productList), false);


