const authController = require("./auth.controller");
const buscarController = require("./buscar.controller");
const categoriasController = require("./categorias.controller");
const productosController = require("./productos.controller");
const usuariosController = require("./usuarios.controller");
const uploadController = require("./uploads.controller");
module.exports = {
  ...authController,
  ...buscarController,
  ...categoriasController,
  ...productosController,
  ...usuariosController,
  ...uploadController,
};
