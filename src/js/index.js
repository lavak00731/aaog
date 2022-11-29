import "./../styles/styles.css";
import "./../styles/home.css";
function importAll(r) {
    return r.keys().map(r);
  }  
  const images = importAll(require.context('./../imagenes/', true, /\.(png|jpg|svg)$/));
