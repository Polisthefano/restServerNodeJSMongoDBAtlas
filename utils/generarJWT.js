const jwt = require("jsonwebtoken");
const generarJWT = (data) => {
  //   const token = jwt.sign(payload, "privateKey");
  return new Promise((resolve, reject) => {
    const payload = {
      data: data,
      exp: Math.floor(Date.now() / 1000) + 86400, // un dia de expiracion, revisar la docu de la libreria porque hay otra forma
      //https://www.npmjs.com/package/jsonwebtoken
    };
    jwt.sign(payload, process.env.SECRETKEY, (err, token) => {
      if (err) {
        reject("No se pudo generar el JWT ", err);
      } else {
        resolve(token);
      }
    });
  }); //ya no es necesario porque la libreria tiene el metodo sincrono para hacer esto, lo dejo arriba
};

module.exports = { generarJWT };
