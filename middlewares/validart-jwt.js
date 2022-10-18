const { request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");
const validarJWT = async (req, res, next) => {
  //preferible usar un header personalizado para token y no la cabecera Authorization
  const token = req.headers.token_access;
  if (!token) {
    return res.status(401).json("No esta autorizado");
  }
  try {
    const { data } = jwt.verify(token, process.env.SECRETKEY);
    //req.uid = data.uid; //de esta forma podemos modificar cualquier valor que venga en la request o agregar para despues obtenerlo en el controlador
    //en este caso se obtendria req.uid o tambien el usuario req.usuario

    //leer usuario autenticado
    const usuario = await Usuario.findById(data.uid);

    if (!usuario) {
      return res.status(401).json("Token no valido - usuario no existente");
    }

    if (!usuario.estado) {
      return res.status(401).json("Token no valido - usuario eliminado");
    }

    req.usuario = usuario;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json("Token no valido");
  }
};

module.exports = { validarJWT };
