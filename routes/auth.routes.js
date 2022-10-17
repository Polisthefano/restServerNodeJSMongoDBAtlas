const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { loguearRequest } = require("../middlewares/utils");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo no es valido").isEmail(), //debe ser email
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    loguearRequest,
    validarCampos,
  ],
  login
);
module.exports = router;
