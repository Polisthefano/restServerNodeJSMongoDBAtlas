const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const productosQuery = await Producto.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"])
    .populate(["categoria"], ["nombre", "id"]);
  res.json({ categorias: productosQuery });
};

const obtenerProducto = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const categoriaQuery = await Categoria.findById(req.params.id) //esta es la forma de enviar condiciones o where a consultas en mongo
    .skip(Number(desde)) //empieza desde el numero de registro enviados
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"]); //populate obtiene un documento relacionado por medio del atributo, en este caso, en la fila usuario del documento guardamos el id del usuario creador
  res.json({ categoria: categoriaQuery }); //como segundo parametro de populate podemos pasar un array con los atributos de la coleccion que nos importan
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });
  if (productoDB) {
    return res.status(400).json("Ya existe el producto " + req.body.nombre);
  }
  const dataProducto = { ...body, usuario: req.usuario._id };
  const newProducto = new Producto({ ...dataProducto });
  await newProducto.save();
  res.status(200).json(newProducto);
};
module.exports = { crearProducto, obtenerProductos };
