const { Usuario, Producto } = require("../models");

const getRecordByIdFromSomeCollection = async (
  collection = "",
  idRecord = ""
) => {
  let model;
  switch (collection) {
    case "usuarios":
      model = await Usuario.findById(idRecord);
      if (!model) {
        throw new Error("Do no exists user with ID " + idRecord);
      }
      break;
    case "productos":
      model = await Producto.findById(idRecord);
      if (!model) {
        throw new Error("Do no exists products with ID " + idRecord);
      }
      break;
    default:
      throw new Error("Collection not allowed");
  }
  return model;
};
module.exports = { getRecordByIdFromSomeCollection };
