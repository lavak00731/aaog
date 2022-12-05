import "./../styles/styles.css";
import "./../styles/home.css";
import MyMenu from "./menu";
function importAll(r) {
    return r.keys().map(r);
  }  
  const images = importAll(require.context('./../imagenes/', true, /\.(png|jpg|svg)$/));
  const menu = new MyMenu('navMenu', 'menuTrigger', 'aaog-menu-trigger');
 menu.init();
