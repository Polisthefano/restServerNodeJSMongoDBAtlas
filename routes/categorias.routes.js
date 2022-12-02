const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/");
const { existeCategoria } = require("../database/db-validators");
const {
  loguearRequest,
  validarJWT,
  validarCampos,
  tieneRole,
} = require("../middlewares/index");

const router = Router();
//obtener todas las categorias - public
router.get("/", [loguearRequest], obtenerCategorias);

//obtener una categoria en particular - public
router.get(
  "/:id",
  [
    loguearRequest,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

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
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

//Eliminar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    tieneRole("ADMIN_ROLE"),
    validarCampos,
  ],
  eliminarCategoria
);
module.exports = router;
