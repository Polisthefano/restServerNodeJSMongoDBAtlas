const loguearRequest = require("../middlewares/utils");
const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validart-jwt");
const validaRoles = require("../middlewares/validar-roles");
//de esta manera y usando spread podemos, mediante un archivo index.js e importando ese archivo, agrupamos las importaciones que vienen de una misma carpeta
module.exports = {
  ...loguearRequest,
  validarCampos,
  ...validarJWT,
  ...validaRoles,
};
