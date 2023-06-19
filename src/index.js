const fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {// resolve, reject estan relacionados a then y catch, pero son funciones, callbacks
    // identificar si la ruta existe.
    if (fs.existsSync(path)) {

    } else {
      // si no existe la ruta es reject, rechaza la promesa
      reject('La ruta no existe')
    }



    //Revisar si la ruta es absoluta o relativa
  });
}

module.exports = {
  mdLinks
  // ...
};
