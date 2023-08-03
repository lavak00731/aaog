export const modal = () => {
    let triggerElem;
    let isAlreadeOpened = false;
    const setFocusTrap = (focusableElems) => {
        focusableElems.forEach( (element, idx) => {            
            element.addEventListener('keyup', function(e){
                if(idx === 0 && e.shiftKey) focusableElems[focusableElems.length - 1].focus()
                if(idx === focusableElems.length - 1 && !e.shiftKey ) focusableElems[0].focus()
                
            })
        });
    }
    const focusTrap = (elem) => {
        if(isAlreadeOpened) return false;
        isAlreadeOpened = true;
        const focusableElems = elem.querySelectorAll('input, button, a, [tabIndex="0"], select, textarea')
        setFocusTrap(focusableElems);
    }
    const openModal = (target, trigger) => {
        triggerElem = trigger
        const modalElem = document.querySelector(target);
        modalElem.removeAttribute('hidden');
        modalElem.focus();
        focusTrap(modalElem);
    }
    const closeModal = (target) => {
        isAlreadeOpened = false;
        const modalElem = document.querySelector(target);
        modalElem.setAttribute('hidden', true);
        triggerElem.focus();
    }
    document.addEventListener('keyup', (e) =>{
        const modalId = document.querySelector('[aria-modal="true"]').id;
        if(isAlreadeOpened && e.code === "Escape") closeModal("#"+modalId);
    }, false);
    return { openModal, closeModal }
}