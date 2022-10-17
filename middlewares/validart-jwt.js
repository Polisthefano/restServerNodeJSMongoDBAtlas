const { request } = require("express");
const jwt = require("jsonwebtoken");
const validarJWT = (req, res, next) => {
  //preferible usar un header personalizado para token y no la cabecera Authorization
  const token = req.headers.token_access;
  if (!token) {
    return res.status(401).json("No esta autorizado");
  }
  try {
    const { data } = jwt.verify(token, process.env.SECRETKEY);
    req.uid = data.uid; //de esta forma podemos modificar cualquier valor que venga en la request o agregar para despues obtenerlo en el controlador
    //en este caso se obtendria req.uid
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json("Token no valido");
  }
};

module.exports = { validarJWT };
