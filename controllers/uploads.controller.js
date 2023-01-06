const {
  cleanPreviousFile,
  uploadFileToLocalOrProduction,
  saveFileToFS,
} = require("../helpers");
const {
  getRecordByIdFromSomeCollection,
} = require("../helpers/getRecordByCollection");

const path = require("path");
const fs = require("fs");
const { response } = require("express");

const cargarArchivo = async (req, res = response) => {
  try {
    const uploadFilePath = await saveFileToFS(req.files, undefined, "imgs");
    res.json(uploadFilePath);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateFile = async (req, res = response) => {
  const { id, coleccion: collection, enviroment } = req.params;
  let model;

  //get record by id
  try {
    model = await getRecordByIdFromSomeCollection(collection, id);
  } catch (err) {
    return res.status(400).json(err.message);
  }

  //clean previous file
  try {
    cleanPreviousFile(model, enviroment);
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error - error when try update file");
  }

  //upload file
  try {
    model = await uploadFileToLocalOrProduction(req.files, model, enviroment);
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getFileFromCollecion = async (req, res = response) => {
  const { id, coleccion: collection } = req.params;
  let model;
  //get record by id
  try {
    model = await getRecordByIdFromSomeCollection(collection, id);
  } catch (err) {
    return res.status(400).json(err.message);
  }

  //rebuild path and send image
  try {
    let existsFile = false;
    const noImgPath = path.join(__dirname, "../shared/assets", "no-image.jpg");
    let imgPath = "";
    if (model.img) {
      imgPath = path.join(__dirname, "../uploads", collection, model.img);
      if (fs.existsSync(imgPath)) {
        existsFile = true;
      }
    }
    if (existsFile) {
      return res.status(200).sendFile(imgPath); //allow sendFiles via response. This allow in frontend send request to this endpoint and in src path into <img> put the result
    } else {
      return res.status(200).sendFile(noImgPath); //allow sendFiles via response. This allow in frontend send request to this endpoint and in src path into <img> put the result
    }
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error - error when try get file");
  }
};

module.exports = { cargarArchivo, updateFile, getFileFromCollecion };
