const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const categoriasQuery = await Categoria.find({ estado: true }) //esta es la forma de enviar condiciones o where a consultas en mongo
    .skip(Number(desde)) //empieza desde el numero de registro enviados
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"]); //populate obtiene un documento relacionado por medio del atributo, en este caso, en la fila usuario del documento guardamos el id del usuario creador
  res.json({ categorias: categoriasQuery }); //como segundo parametro de populate podemos pasar un array con los atributos de la coleccion que nos importan
};

const obtenerCategoria = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const categoriaQuery = await Categoria.findById(req.params.id) //esta es la forma de enviar condiciones o where a consultas en mongo
    .skip(Number(desde)) //empieza desde el numero de registro enviados
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"]); //populate obtiene un documento relacionado por medio del atributo, en este caso, en la fila usuario del documento guardamos el id del usuario creador
  res.json({ categoria: categoriaQuery }); //como segundo parametro de populate podemos pasar un array con los atributos de la coleccion que nos importan
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

const actualizarCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json("Ya existe la categoria " + req.body.nombre);
  }
  const categoriaUpdate = await Categoria.findByIdAndUpdate(req.params.id, {
    nombre,
    id: req.params.id,
  }).populate("usuario", ["nombre", "id"]);
  res.status(200).json(categoriaUpdate);
};

const eliminarCategoria = async (req, res = response) => {
  const categoriaDelete = await Categoria.findByIdAndUpdate(req.params.id, {
    estado: false,
  });
  res.status(200).json(categoriaDelete);
};
module.exports = {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
