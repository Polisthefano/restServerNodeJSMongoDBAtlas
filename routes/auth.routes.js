const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers");
const { loguearRequest, validarCampos } = require("../middlewares");

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

router.post(
  "/google",
  [
    check("id_token", "El id token es requerido").not().isEmpty(),
    loguearRequest,
    validarCampos,
  ],
  googleSingIn
);
module.exports = router;
