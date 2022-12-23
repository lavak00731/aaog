export default class MyMenu {
    constructor (id, btnId, innerBtns) {
        this.menuItems = document.querySelectorAll('#'+id+' a, #'+id+' button');
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
            this.switchMenu(e.target.closest('button'));
        } else {
            this.switchMenu(e.target)
        }        
    } 
    goNext(list, index) {
      if(index === list.length - 1) {
        list[0].focus();
      } else {
        list[index+1].focus();
      }
    }
    goPrevious(list, index) {
      if(index === 0) {
        list[list.length-1].focus();
      } else {
        list[index-1].focus();
      }
    }
    triggerBtn (e) {
      const activeElem = document.activeElement;
      const innerListWrapper = activeElem.nextElementSibling;
      this.menuOpenOrClosed(e);
      innerListWrapper.querySelectorAll('li a')[0].focus();    
    }
    selectSubMenuTrigger( e ) {
      const parentElem = e.target.closest('.aaog-submenu');
      const subMenuTrigger = parentElem.previousElementSibling;
      this.switchMenu(subMenuTrigger);
      subMenuTrigger.focus();
    }
    jumpToMainMenu( e, index, list, direction ) {
      if (e.target.classList.contains('aaog-menuitem')) {
        this.selectSubMenuTrigger(e);
        list = this.getList(e);
        index =  this.getIndex(list, document.activeElement);
      }
      if (direction === 'right') {
        this.goNext(list, index); 
      } else {
        this.goPrevious(list, index); 
      }
    }
    focusMovement(e, index, list, direction) {
        switch (direction) {
            case 'right':                            
              this.jumpToMainMenu(e, index, list, direction);
              break;
            case 'left':
              this.jumpToMainMenu(e, index, list, direction);                             
              break;
            case 'up':
              this.goPrevious(list, index); 
              break;
            case 'down':
              if(document.activeElement.classList.contains('aaog-menu-trigger')) {
                this.triggerBtn(e);
              } else {
                this.goNext(list, index); 
              }
              break;
            default:              
          }
    }  
    getIndex (collection, elem)  {
       return [].indexOf.call(collection, elem)  
     }
     getList(e) {
      if((e.target.classList.contains('aaog-menuitem') && ( e.key === 'ArrowUp' || e.key === 'ArrowDown' ) )   || (e.target.classList.contains('aaog-menu-trigger') && e.key === 'ArrowDown')) {
        return document.querySelectorAll('#navMenu a.aaog-menuitem');
      } else  {
        return document.querySelectorAll('#navMenu a:not(.aaog-menuitem), #navMenu button:not(.aaog-menuitem, .aaog-menu-opener)');
      }
     }
    keyBoardNav (e) {
        e.preventDefault();
        const parentElemList =  this.getList(e);
        switch (e.key) {
            case 'ArrowRight':                
                this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'right');
              break;
            case 'ArrowLeft':
                this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'left');
              break;
            case 'ArrowUp':
                this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'up');
              break;
            case 'ArrowDown':
                this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'down');
              break;
            case 'Enter': 
              this.triggerBtn(e);            
              break;
            case 'Escape':
              this.selectSubMenuTrigger(e);
              break;
            default:              
          }          
    }
    init() {
        if(this.btnTrigger) {
            this.btnTrigger.addEventListener('click', this.menuOpenOrClosed.bind(this));
        }
        this.innerBtns.forEach((btn)=> btn.addEventListener('mousedown', this.menuOpenOrClosed.bind(this)));
        this.menuItems.forEach((item)=> item.addEventListener('keyup', this.keyBoardNav.bind(this)));
    } 
      
}

