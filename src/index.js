import "./styles/styles.css";
function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('./imagenes/', true, /\.(png|jpg|svg)$/));
  console.log(images)