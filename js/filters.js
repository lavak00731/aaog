const pistolFilters =  {
    es: [
        {
            label: "Mecha",
            value: "matchlock"
        },
        {
            label: "Rueda",
            value: "wheellock" 
        },
        {
            label: "Pedernal",
            value: "flintlock"
        },
        {
            label: "Percusión",
            value: "percussion"
        }
    ],
    en: [
        {
            label: "Matchlock",
            value: "matchlock"
        },
        {
            label: "Wheellock",
            value: "wheellock" 
        },
        {
            label: "Flintlock",
            value: "flintlock"
        },
        {
            label: "Percussion",
            value: "percussion"
        }
    ]
};      
const artilleryFilters = {
    es: [
        {
            label: "Campo",
            value: "field"
        },
        {
            label: "Naval",
            value: "navy"
        },
        {
           label: "Mortero",
           value: "mortar"
        }
    ],
    en: [
        {
            label: "Field",
            value: "field"
        },
        {
            label: "Navy",
            value: "navy"
        },
        {
           label: "Mortar",
           value: "mortar"
        }
    ]
}
const totalItems = {
    es: " productos",
    en: " products"
}

const showProduct = (product) => {
    product.classList.remove('filtered');
    product.removeAttribute('hidden');
}

export const resetFilterByFeature = (productList) => {
    const inputs = document.querySelectorAll('#options input[type="radio"]');
    inputs.forEach((input)=> input.checked = false);
    productList.forEach((product) => {
        showProduct(product);
    });
    amountRendering();
}
const amountRendering = () => {
    const quantityProd = document.querySelector('#productQuatity');
    quantityProd.innerHTML = `<span>${document.querySelectorAll('.aaog-product-wrapper:not(.filtered)').length}</span> ${totalItems[document.querySelector('html').lang]}`;
}
export const addFilterByFeature = (pageName) => {
    let filters;
    switch (pageName) {
        case 'pistolsandrifles':
            filters = pistolFilters;
            break;
            case 'artillery':
                filters = artilleryFilters;
                break;
        default:
            break;
    }
    const dataToDisplay = filters[document.querySelector('html').lang];
    const target = document.querySelector('#options');
    const fragment = document.createDocumentFragment();
    dataToDisplay.forEach((filter)=>{
        const label = document.createElement('label')
        label.setAttribute('for', filter.value);
        label.textContent = filter.label;
        const input = document.createElement('input');
        input.type = 'radio';
        input.classList.add('aaog-visuallyhidden');
        input.id = filter.value;
        input.value = filter.value;
        input.name  = pageName;
        const wrapper = document.createElement('div');
        wrapper.classList.add('aaog-input-wrapper');
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        fragment.appendChild(wrapper);
    });
    target.appendChild(fragment);  
    amountRendering();  
};
export const filterByFeature = (type, listOfProducts) => {
    listOfProducts.forEach((product)=>{ 
        if(product.dataset.feature !== type) {
            product.classList.add('filtered');
            product.addEventListener('transitionend', ()=>{
                product.setAttribute('hidden', true);
            })
        } else {
            showProduct(product);
        }
    });
    amountRendering();
}