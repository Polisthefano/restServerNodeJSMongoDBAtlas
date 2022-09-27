const { response, request } = require("express"); //al importar esto y poner res=response y req=request hace que vscode

const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");

const usuariosGet = async(req = request, res = response) => {
    // const { nombre = "Sin nombre", apikey } = req.query; //aca vienen los query params, son los que mandamos en la url con ? el primero y despuse & para concatenar
    const { limit = 5, since = 0 } = req.query;
    const usuariosQuery = Usuario.find({ estado: true }) //esta es la forma de enviar condiciones o where a consultas en mongo
        .skip(Number(since)) //empieza desde el numero de registro enviados
        .limit(Number(limit)); //limite es el limite de registros que retorna
    const [totalUsuariosEnDB, usuarios] = await Promise.all([Usuario.countDocuments({ estado: true }), usuariosQuery]) //Promise all retorna un array donde en cada posicion va la respuesta a la promesa que resolvio
    res.status(200).json({
        msg: "Usuarios obtenidos correctamente",
        totalUsuariosEnDB,
        usuarios,
    });
};

const usuariosPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); //este usuario es un objeto creado por mongoose pero es un objeto y podemos acceder a sus propiedades sin problema
    const existeMail = await Usuario.findOne({ correo }); //esto busco solo un registro
    if (existeMail) {
        return res.status(400).json({ msg: "Este email ya esta registrado" });
    }
    //genera hash contrasena
    const hashPassword = bcrypt.genSaltSync(); //numero de vueltas para hacer mas dificil el metodo de encriptacion
    usuario.password = bcrypt.hashSync(password, hashPassword); //genera un hash de la password

    //guarda en mongo
    await usuario.save(); //esto guarda el usuario creado en la collecion que se creo por medio de new Usuario()
    res.status(200).json({
        msg: "ok",
        usuario,
    });
};

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;
    //validar id no existente, con express validator, correo actualizar role actualizar, role valido controlar
    if (password) {
        const hashPassword = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, hashPassword);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: "Usuario actualizado correctamente",
        usuario,
    });
};
const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: "delete API",
    });
};
const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: "patch API",
    });
};
module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};