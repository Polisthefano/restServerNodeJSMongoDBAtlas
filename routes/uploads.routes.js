const { Router } = require("express");
const {
  cargarArchivo,
  getFileFromCollecion,
  updateFile,
} = require("../controllers");
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
  updateFile
);

router.get(
  "/:coleccion/:id",
  [
    loguearRequest,
    check("id", "id should be mongo id valid").isMongoId(),
    check("coleccion").custom((c) =>
      validateAllowedCollections(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  getFileFromCollecion
);

module.exports = router;
