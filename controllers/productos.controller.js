const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const productosQuery = await Producto.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"])
    .populate("categoria", ["nombre", "id"]);
  res.json({ categorias: productosQuery });
};

const obtenerProducto = async (req, res) => {
  const { desde = 0, total = 0 } = req.query;
  const productoQuery = await Producto.findById(req.params.id)
    .skip(Number(desde))
    .limit(Number(total))
    .populate("usuario", ["nombre", "id"])
    .populate("categoria", ["nombre", "id"]);
  res.json({ producto: productoQuery });
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

const actualizarProducto = async (req, res = response) => {
  const { estado, ...body } = req.body;
  body.usuario = req.usuario._id;
  const productoUpdate = await Producto.findByIdAndUpdate(req.params.id, body)
    .populate("usuario", ["nombre", "id"])
    .populate("categoria", ["nombre", "id"]);
  res.status(200).json(productoUpdate);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
};
