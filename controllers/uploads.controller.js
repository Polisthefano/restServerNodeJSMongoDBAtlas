const { uploadFile } = require("../helpers");
const { Usuario, Producto } = require("../models");
const cargarArchivo = async (req, res = response) => {
  try {
    const uploadFilePath = await uploadFile(req.files, undefined, "imgs");
    res.json(uploadFilePath);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateImagen = async (req, res = response) => {
  const { id, coleccion: collection } = req.params;
  let model;

  switch (collection) {
    case "usuarios":
      model = await Usuario.findById(id);
      if (!model) {
        return res.status(400).json("Do no exists user with ID " + id);
      }
      break;
    case "productos":
      model = await Producto.findById(id);
      if (!model) {
        return res.status(400).json("Do no exists products with ID " + id);
      }
      break;
    default:
      return res.status(500).json("Collection not allowed");
  }

  try {
    const nombre = await uploadFile(req.files, undefined, collection);
    model.img = nombre;
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { cargarArchivo, updateImagen };
