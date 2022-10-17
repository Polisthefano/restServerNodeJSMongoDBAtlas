const jwt = require("jsonwebtoken");
const generarJWT = (payload) => {
  //   const token = jwt.sign(payload, "privateKey");
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el JWT ", err);
        } else {
          resolve(token);
        }
      }
    );
  }); //ya no es necesario porque la libreria tiene el metodo sincrono para hacer esto, lo dejo arriba
};

module.exports = { generarJWT };
