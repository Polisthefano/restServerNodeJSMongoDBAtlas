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

const allowEnviroments = ["PRODUCTION", "LOCAL"];

router.post("/", [loguearRequest, validateFilesInRequest], cargarArchivo);

router.put(
  "/:coleccion/:id/:enviroment",
  [
    loguearRequest,
    validateFilesInRequest,
    check("id", "id should be mongo id valid").isMongoId(),
    check("coleccion").custom((c) =>
      validateAllowedCollections(c, ["usuarios", "productos"])
    ),
    check("enviroment").toUpperCase().isIn(allowEnviroments),
    validarCampos,
  ],
  updateFile
);

router.get(
  "/:coleccion/:id/:enviroment",
  [
    loguearRequest,
    check("id", "id should be mongo id valid").isMongoId(),
    check("coleccion").custom((c) =>
      validateAllowedCollections(c, ["usuarios", "productos"])
    ),
    check("enviroment").toUpperCase().isIn(allowEnviroments),
    validarCampos,
  ],
  getFileFromCollecion
);

module.exports = router;
