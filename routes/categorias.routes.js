const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategorias } = require("../controllers/categorias.controller");
const { loguearRequest } = require("../middlewares/utils");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();
//obtener todas las categorias - public
router.get("/", obtenerCategorias);

//obtener una categoria en particular - public
router.get("/:id");

//Crear categoria - private
router.post("/");

//Actualizar una categoria por id - privado
router.put("/:id");

//Eliminar una categoria - Admin
router.delete("/:id");
module.exports = router;
