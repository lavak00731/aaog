const filtersByName = {
    pistolsandrifles: [
        {
            es: {
                name: "Pistola de Mecha"
            },
            en: {
                name: "Matchlock Pistol"
            }
        },
        {
            es: {
                name: "Pistola de Mecha Japonesa"
            },
            en: {
                name: "Japanese Matchlock Pistol Tanzutsu"
            }
        },
        {
            es: {
                name: "Mosquete de Mecha"
            },
            en: {
                name: "Matchlock Musket"
            }
        },
        {
            es: {
                name: "Pistola Alemana de Rueda 1632"
            },
            en: {
                name: "German Wheel Lock Pistol"
            }
        },
        {
            es: {
                name: "Pistola Light Dragoon"
            },
            en: {
                name: "Light Dragoon Pistol"
            }
        },
        {
            es: {
                name: "Pistola Kentucky"
            },
            en: {
                name: "Kentucky Pistol"
            }
        },
        {
            es: {
                name: "Pistola Harper's Ferry"
            },
            en: {
                name: "Harper's Ferry Pistol"
            }
        },
        {
            es: {
                name: "Le Page Moutier version Pedernal"
            },
            en: {
                name: "Le Page Moutier Flintlock Pistol"
            }
        },
        {
            es: {
                name: "Pistola de Duelo Inglesa Perkins"
            },
            en: {
                name: "English Dueling Pistol Perkins"
            }
        },
        {
            es: {
                name: "Pistola Trabuco Británica"
            },
            en: {
                name: "English Blunderbuss Pistol"
            }
        },
        {
            es: {
                name: "Pistola Británica Sea Service"
            },
            en: {
                name: "Sea Service Pistol"
            }
        },
        {
            es: {
                name: "Mosquete Brown Bess"
            },
            en: {
                name: "Brown Bess"
            }
        },
        {
            es: {
                name: "Fusil Frances Charleville"
            },
            en: {
                name: "Charleville French Musket"
            }
        },
        {
            es: {
                name: "Pistola de Percusión Perkins"
            },
            en: {
                name: "Perkins Dueling Pistol Percussion Version"
            }
        },
        {
            es: {
                name: "Pistola Le Page Moutier"
            },
            en: {
                name: "Le Page Moutier Pistol"
            }
        },
        {
            es: {
                name: "Pistola Kentucky Percusión"
            },
            en: {
                name: "Kentucky Pistol"
            }
        },
        {
            es: {
                name: "Pistola Enfield (Barnett)"
            },
            en: {
                name: "Enfield Pistol (Barnett)"
            }
        },
        {
            es: {
                name: "Pistola Aston"
            },
            en: {
                name: "Aston Pistol"
            }
        },
        {
            es: {
                name: "Pistola Austríaca"
            },
            en: {
                name: "Austrian Pistol"
            }
        },
        {
            es: {
                name: "Trabuco Naranjero Percusión"
            },
            en: {
                name: "Blunderbuss"
            }
        },
        {
            es: {
                name: "Pistola Austríaca Lorenz"
            },
            en: {
                name: "Austrian Lorenz Pistol"
            }
        },
        {
            es: {
                name: "Pistola Le Page Moutier a Paris (octogonal)"
            },
            en: {
                name: "Le Page Moutier Percussion Pistol (octagonal barrel)"
            }
        },
        {
            es: {
                name: "Kentucky Rifle"
            },
            en: {
                name: "Kentucky Rifle"
            }
        },
        {
            es: {
                name: "Rifle Big Bore"
            },
            en: {
                name: "Big Bore Rifle"
            }
        },
        {
            es: {
                name: "Escopeta Underhammer Golden Shotgun"
            },
            en: {
                name: "Underhammer Golden Shotgun"
            }
        },
        {
            es: {
                name: "Rifle Underhammer Golden Boy"
            },
            en: {
                name: "Underhammer Golden Boy Rifle"
            }
        },   

    ]
};
const pistolFilters =  {
    es: [
        {
            label: "Llave de Mecha",
            value: "matchlock"
        },
        {
            label: "Llave de Rueda",
            value: "wheellock" 
        },
        {
            label: "Llave de Pedernal",
            value: "flintlock"
        },
        {
            label: "Llave de Percusión",
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
 
let names = [];
const sanitizeNames = (prodName) => prodName.normalize('NFD').replace(/\p{Diacritic}/gu, "");
export const addListForFilteringByName = (pageName, listLocation) => {
    const pageData = filtersByName[pageName];
    const target = document.getElementById(listLocation);
    const fragment = document.createDocumentFragment();
    pageData.forEach((product)=>{
        const optionList = document.createElement('option');        
        optionList.textContent = product[document.querySelector('html').lang].name;
        const name = sanitizeNames(product.es.name);
        names.push(name);        
        fragment.appendChild(optionList);
    });
    target.appendChild(fragment)
};
export const filterByName = (name, listOfProducts) => {
    name = name.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    if(names.includes(name)) {
        listOfProducts.forEach((product)=>{        
            if(product.dataset.name !== name) {
                product.classList.add('filtered');
                product.addEventListener('transitionend', ()=>{
                    product.setAttribute('hidden', true);
                })
            } else {
                product.classList.remove('filtered');
                product.removeAttribute('hidden');
            }       
        });
    } else {
        listOfProducts.forEach((product) => {
            product.setAttribute('hidden', true);
        })
        document.querySelector('#no-results').removeAttribute('hidden')
    }        
}
export const resetSearch = (listOfProducts) => {
    listOfProducts.forEach((product) => {
        product.classList.remove('filtered');
        product.removeAttribute('hidden');        
    });
    document.querySelector('#no-results').setAttribute('hidden', true);
}
export const addFilterByFeature = (pageName) => {
    let filters;
    switch (pageName) {
        case 'pistolsandrifles':
            filters = pistolFilters;
            break;
    
        default:
            break;
    }
    const dataToDisplay = filters[document.querySelector('html').lang];
    const target = document.querySelector('#options');
    const fragment = document.createDocumentFragment();
    dataToDisplay.forEach((filter)=>{
        const label = document.createElement('label')
        label.setAttribute('for', filter.label);
        label.textContent = filter.label;
        const input = document.createElement('input');
        input.type = 'radio';
        input.classList.add('aaog-visuallyhidden');
        input.id = filter.name;
        input.value = filter.value;
        input.name  = pageName;
        fragment.appendChild(input);
        fragment.appendChild(label);
    });
    target.appendChild(fragment);
}
