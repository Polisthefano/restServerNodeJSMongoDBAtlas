const { Router } = require("express");
const { cargarArchivo, updateArchivo } = require("../controllers");
const { check } = require("express-validator");
const { loguearRequest, validarCampos } = require("../middlewares/index");
const { validateAllowedCollections } = require("../helpers");
const router = Router();

router.post("/", [loguearRequest], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    check("id", "id should be mongo id valid").isMongoId(),
    check("coleccion").custom((c) =>
      validateAllowedCollections(c, ["usuarios", "productos"])
    ),
    validarCampos,
    loguearRequest,
  ],
  updateArchivo
);

module.exports = router;
