export default class MyMenu {
    constructor (id, btnId, innerBtns) {
        this.menu = document.querySelector('#'+id);
        this.btnTrigger = document.querySelector('#'+btnId);
        this.innerBtns = document.querySelectorAll('.'+innerBtns);
    }
    switchMenu(elem) {
        if(elem.getAttribute('aria-expanded') === 'false') {
            elem.setAttribute('aria-expanded', true);
        } else {
            elem.setAttribute('aria-expanded', false);
        }
    }
    menuOpenOrClosed (e) {
        if(e.target.tagName !== 'BUTTON') {
            this.switchMenu(this.btnTrigger);
        } else {
            this.switchMenu(e.target)
        }
        
    } 
    init() {
        if(this.btnTrigger) {
            this.btnTrigger.addEventListener('click', this.menuOpenOrClosed.bind(this));
        }
        this.innerBtns.forEach((btn)=> btn.addEventListener('click', this.menuOpenOrClosed.bind(this)));
    } 
      
}

