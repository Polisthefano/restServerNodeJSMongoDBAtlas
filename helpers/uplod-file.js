const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path"); //para unir y normalizar paths
const uploadFile = (
  files,
  allowedExtensions = ["jpg", "jpeg", "zip", "txt", "png", "gif"], //if not send allowedExtensions this is the default value
  folderPath = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const extension = file.name.split(".")[file.name.split(".").length - 1]; //the last position of array from file.name.split

    if (allowedExtensions && !allowedExtensions.includes(extension)) {
      return reject(`Extension ${extension} is not allowed`);
    }
    const newName = uuidv4() + "." + extension; //onyle uuid in name
    const uploadDir = path.join(__dirname, "../uploads/", folderPath); // __dirname es donde estoy parado
    const uploadPath = path.join(uploadDir, newName);

    //crea la ruta si no existe
    // if (!fs.existsSync(uploadDir, { recursive: true })) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    if (fs.existsSync(uploadPath, { recursive: true })) {
      return reject("File already exists");
    }
    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(newName);
    });
  });
};
module.exports = { uploadFile };
