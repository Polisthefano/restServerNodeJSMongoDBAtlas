const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios.controller");
const {
  roleDBValidator,
  emailDBValidador,
  IdDBValidador,
} = require("../database/db-validators"); //callback de validacion personalizada del rol
const {
  loguearRequest,
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRole,
} = require("../middlewares");
const router = Router();
router.get("", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    check("id").custom(IdDBValidador),
    check("rol").custom(roleDBValidator),
    validarCampos,
  ],
  usuariosPut
); //forma de pasar parametros por la url
//check tiene la posibilidad de ver si es un id de mongo

router.post(
  "",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(), //not niega toda condicion que pongan despues
    check("password", "El password debe contener mas de 6 caracteres").isLength(
      { min: 6 }
    ), //contrasena min length
    check("correo", "El correo no es valido").isEmail(), //debe ser email
    check("correo").custom(emailDBValidador),
    check("rol").custom(roleDBValidator),
    check("rol", "El rol es requerido").not().isEmpty(),
    // check('rol','No es un rol válido').isIn(['USER_ROLE','ADMIN_ROLE']), //si existe en ese array
    loguearRequest,
    validarCampos,
  ],
  usuariosPost
); //en el medio entre el path y el controllador van el array de middleware o funciones que se ejecutan antes del controlador

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRol, //fuerza a que sea admin
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"), //chequea que se algun role de esos
    check("id", "Este id no es un id valido de mongo").isMongoId(),
    validarCampos,
    check("id").custom(IdDBValidador),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("", usuariosPatch);
module.exports = router;
