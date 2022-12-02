const { Router } = require("express");
const { param } = require("express-validator");
const { buscar } = require("../controllers/buscar.controller");
const { validarCampos, loguearRequest } = require("../middlewares/index");
const { coleccionesPermitidas } = require("../shared/globals");

const router = Router();

router.get(
  "/:collecion/:termino",
  [
    param(
      "collecion",
      "Las colleciones permitidas son: " + coleccionesPermitidas
    ).isIn(coleccionesPermitidas),
    loguearRequest,
    validarCampos,
  ],
  buscar
);

module.exports = router;
