const { uploadFile } = require("../helpers/uplod-file");
const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json("There arent files in the request");
    return;
  }
  try {
    const uploadFilePath = await uploadFile(req.files, null, "imgs");
    res.json(uploadFilePath);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { cargarArchivo };
