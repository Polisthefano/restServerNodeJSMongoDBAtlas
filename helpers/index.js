const dbValidators = require("./db-validators");
const generarJWT = require("./generarJWT");
const googleVerify = require("./google-verify");
const manageFiles = require("./manage-files");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...manageFiles,
};
