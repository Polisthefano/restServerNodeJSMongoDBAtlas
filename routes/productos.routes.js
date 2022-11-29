const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
} = require("../controllers/productos.controller");
const { existeCategoria } = require("../database/db-validators");
const {
  loguearRequest,
  validarJWT,
  validarCampos,
  tieneRole,
} = require("../middlewares/index");

const router = Router();
//obtener todos las productos - public
router.get("/", [loguearRequest], obtenerProductos);

//obtener un producto en particular - public
router.get(
  "/:id",
  [
    loguearRequest,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  () => {}
);

//Crear un producto - private
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio").custom(numberNotNegativeIfExist),
    check("categoria", "Este id no es un id valido de mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    check("precio", "El precio debe ser mayor a 0")
      .optional()
      .isInt({ min: 0 }), //optional permite que si viene el valor, cumpla una condicion
    check("descripcion", "La descripcion debe tener al menos un caracter")
      .optional()
      .isLength({ min: 1, max: 100 }),
    // numberNotNegativeIfExist({ field: "precio" }),
    validarCampos,
  ],
  crearProducto
);

//Actualizar un producto por id - privado
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  () => {}
);

//Eliminar un producto - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    tieneRole("ADMIN_ROLE"),
    validarCampos,
  ],
  () => {}
);
module.exports = router;
