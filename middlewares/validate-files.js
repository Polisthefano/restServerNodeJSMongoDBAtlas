const validateFilesInRequest = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res
      .status(400)
      .json("There arent files in the request - validateFilesInRequest");
  }
  next(); //necesario en los middlewares para decirle que si todo salio bien, siga con el siguiente middleware o controlador si no hay mas middlewares
};
module.exports = { validateFilesInRequest };
