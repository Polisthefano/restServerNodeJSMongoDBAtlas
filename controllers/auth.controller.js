const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../utils/generarJWT");
const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar el email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json(
          "correo / password no coinciden con un usuario registrado - correo"
        );
    }

    //verificar que no este eliminado
    if (!usuario.estado) {
      return res
        .status(400)
        .json(
          "correo / password no coinciden con un usuario registrado - usuario eliminado"
        );
    }

    //verificar password
    const equalPassword = bcrypt.compareSync(password, usuario.password); //bcrypt.compareSync compara y chequea las firmas de la password guardada en la db y la que mandas por post
    if (!equalPassword) {
      return res
        .status(400)
        .json(
          "correo / password no coinciden con un usuario registrado - password"
        );
    }

    //generacion del JWT
    const token = await generarJWT({ id: usuario.id });
    res.json({ msg: "login ok", usuario, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error, hable con el administrador");
  }
};

module.exports = { login };
