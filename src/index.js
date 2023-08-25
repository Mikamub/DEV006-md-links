const {
  checkPath,
  itsAbsolute,
  convertAbsolute,
  verifyRouteType,
  extensionCheck,
  readMD,
  extractLinks,
  validateLinks
} = require('./functions.js'); //Importar funciones

const mdLinks = (path, options) => { //dos opciones una obligatoria la otra opcional y devuelve una promesa
  let filepath; // para almacenar la ruta del archivo
  return new Promise((resolve, reject) => { //se devuelve alfinal de la promesa
    itsAbsolute(path) //verifica si la ruta es absoluta o relativa y devuelve una promesa que resuelve con la ruta absoluta
      .then((absolutePath) => { //El resultado de itsAbsolute se captura en el primer then
        filepath = absolutePath; // Asignar el valor del filepath a la variable global
        return checkPath(absolutePath); //devolver si  la ruta es md o no
      })
      .then((path) => {
        return extensionCheck(path);//devolver si  la ruta es md o no, promesa booleano true/false
      })
      .then((isMD) => {
        if (!isMD) {
          throw new Error('La extensión del archivo no es .md');
        }
        return verifyRouteType(path); //archivo o directorio
      })
      .then((routeType) => {
        // console.log('Tipo de ruta:', routeType);

        return readMD(path);
      })
      .then((data) => {
        const resultLinks = extractLinks(data, filepath); //que busca y extrae los enlaces y devuelve un array con obj
        if (options && options.validate) { //si es true llama a validatelinks 
          return validateLinks(resultLinks)
            .then((validatedLinks) => {
              return validatedLinks;
            })
            .catch((error) => {
              console.error('Error en la validación de los enlaces:', error);
              return resultLinks;
            });
        } else {
          return resultLinks;
        }
      })
      .then((links) => {
        return resolve(links);
      })
      .catch((error) => {
        console.error(error);
        return reject('Esto está fallando');
      });
  });
};

const path = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
const options = { validate: true };

mdLinks(path, options)
  .then((data) => {
    if (Array.isArray(data)) {
      console.log('Data', data);
    } else {
      console.log('Error: El resultado no es un arreglo');
    }
  })
  .catch((error) => {
    console.log('error', error);
  });

  module.exports = {mdLinks};