const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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
    const token = await generarJWT({ uid: usuario.id });
    res.json({ msg: "login ok", usuario, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error, hable con el administrador");
  }
};

const googleSingIn = async (req, res) => {
  const { id_token } = req.body;
  try {
    const {
      name: nombre, //de esta forma al desectructurar le cambiamos el nombre a como viene el atributo del objeto
      picture: img,
      email: correo,
    } = await googleVerify(id_token);

    //validar si el correo del usuario no esta creado
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const dataUsuarioToInsert = {
        nombre,
        correo,
        img,
        password: ":(",
        google: true,
      };
      usuario = new Usuario(dataUsuarioToInsert);
      await usuario.save();
    } else {
      //se podria hacer un update con la data de google, sino se devuelve el creado
    }

    //si el usuario fue eliminado con ese email
    if (!usuario.estado) {
      return res
        .status(401)
        .json("Hable con el administrador - usuario eliminado");
    }

    const token = await generarJWT({ uid: usuario.id });

    res.json({ usuario, token });
  } catch (err) {
    return res.status(400).json("Token google no es valido");
  }
};

module.exports = { login, googleSingIn };
