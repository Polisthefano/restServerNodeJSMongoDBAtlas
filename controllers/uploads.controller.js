const { uploadFile } = require("../helpers");
const { Usuario, Productos } = require("../models");
const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json("There arent files in the request");
    return;
  }
  try {
    const uploadFilePath = await uploadFile(req.files, undefined, "imgs");
    res.json(uploadFilePath);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateArchivo = async (req, res = response) => {
  const { id, colleccion: collection } = req.params;
  let model;

  switch (collection) {
    case "usuarios":
      model = Usuario.findById(id);
      if (!model) {
        return res.status(400).json("Do no exists user with ID " + id);
      }
      break;
    case "productos":
      model = Productos.findById(id);
      if (!model) {
        return res.status(400).json("Do no exists products with ID " + id);
      }
      break;
    default:
      return res.status(500).json("Collection not allowed");
  }
};

module.exports = { cargarArchivo, updateArchivo };
