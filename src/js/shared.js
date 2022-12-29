import MyMenu from "./menu";
  
export function Shared () {
    function importAll(r) {
        return r.keys().map(r);
      }  
      const images = importAll(require.context('./../imagenes/', true, /\.(png|jpg|jpeg|svg)$/));

    const menu = new MyMenu('navMenu', 'menuTrigger', 'aaog-menu-trigger');
    menu.init();
} 
