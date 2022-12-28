const { Router } = require("express");
const { cargarArchivo, updateImagen } = require("../controllers");
const { check } = require("express-validator");
const { loguearRequest, validarCampos } = require("../middlewares/index");
const { validateAllowedCollections } = require("../helpers");
const { validateFilesInRequest } = require("../middlewares/validate-files");
const router = Router();

router.post("/", [loguearRequest, validateFilesInRequest], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    loguearRequest,
    validateFilesInRequest,
    check("id", "id should be mongo id valid").isMongoId(),
    check("coleccion").custom((c) =>
      validateAllowedCollections(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  updateImagen
);

module.exports = router;
