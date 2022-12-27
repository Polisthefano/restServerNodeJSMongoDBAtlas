const dbValidators = require("./db-validators");
const generarJWT = require("./generarJWT");
const googleVerify = require("./google-verify");
const uploadFile = require("./uplod-file");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...uploadFile,
};
