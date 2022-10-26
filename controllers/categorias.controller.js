const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const categoriasQuery = await Categoria.find({ estado: true }) //esta es la forma de enviar condiciones o where a consultas en mongo
    .skip(Number(desde)) //empieza desde el numero de registro enviados
    .limit(Number(total))
    .populate("usuario"); //populate obtiene un documento relacionado por medio del atributo, en este caso, en la fila usuario del documento guardamos el id del usuario creador
  res.json({ categorias: categoriasQuery });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json("Ya existe la categoria " + req.body.nombre);
  }
  const dataCategoria = { nombre, usuario: req.usuario._id };
  const nuevaCategoria = new Categoria({ ...dataCategoria });
  await nuevaCategoria.save();
  res.status(200).json(nuevaCategoria);
};

module.exports = { obtenerCategorias, crearCategoria };
