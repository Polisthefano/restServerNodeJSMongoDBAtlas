const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL); //auth con cloudinary
const fs = require("fs");
const path = require("path"); //para unir y normalizar paths
const saveFileToFS = (
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

const cleanPreviousFile = (model, enviroment) => {
  try {
    if (enviroment === "LOCAL") {
      if (model.imgLocal) {
        const imgPath = path.join(
          __dirname,
          "../uploads",
          collection,
          model.imgLocal
        );
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath); //unlinkSync delete img from folder
        }
      }
    } else {
      if (model.imgCloud) {
        const arrayNames = model.imgCloud.split("/");
        const fileName = arrayNames[arrayNames.length - 1];
        const [uidImg] = fileName.split("."); //get first position
        cloudinary.uploader.destroy(uidImg); //se le envia el name
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

const uploadFileToLocalOrProduction = async (files, model, enviroment) => {
  try {
    if (enviroment === "LOCAL") {
      const imgName = await saveFileToFS(files, undefined, collection);
      model.imgLocal = imgName;
    } else {
      //if is prod with cloudinary
      const { secure_url } = await cloudinary.uploader.upload(
        files.file.tempFilePath
      ); //con subir el tempFilePath es suficiente
      model.imgCloud = secure_url;
    }
    return model;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  saveFileToFS,
  cleanPreviousFile,
  uploadFileToLocalOrProduction,
};
