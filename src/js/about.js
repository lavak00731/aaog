import "./../styles/styles.css";
function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('./../imagenes/', true, /\.(png|jpeg|jpg|svg)$/));
  console.log(images)