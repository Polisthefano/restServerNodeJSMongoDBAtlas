const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerCategorias,
  crearCategoria,
} = require("../controllers/categorias.controller");
const {
  loguearRequest,
  validarJWT,
  validarCampos,
} = require("../middlewares/index");

const router = Router();
//obtener todas las categorias - public
router.get("/", obtenerCategorias);

//obtener una categoria en particular - public
router.get("/:id");

//Crear categoria - private
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar una categoria por id - privado
router.put("/:id");

//Eliminar una categoria - Admin
router.delete("/:id");
module.exports = router;
