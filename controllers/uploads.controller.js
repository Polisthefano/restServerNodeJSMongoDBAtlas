const { uploadFile } = require("../helpers");
const path = require("path");
const fs = require("fs");
const {
  getRecordByIdFromSomeCollection,
} = require("../helpers/getRecordByCollection");
const { response } = require("express");
const e = require("express");
const cargarArchivo = async (req, res = response) => {
  try {
    const uploadFilePath = await uploadFile(req.files, undefined, "imgs");
    res.json(uploadFilePath);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateFile = async (req, res = response) => {
  const { id, coleccion: collection } = req.params;
  let model;
  //get record by id
  try {
    model = await getRecordByIdFromSomeCollection(collection, id);
  } catch (err) {
    return res.status(400).json(err.message);
  }

  //clean previous file
  try {
    if (model.img) {
      const imgPath = path.join(__dirname, "../uploads", collection, model.img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath); //unlinkSync delete img from folder
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error - error when try update file");
  }

  //upload file
  try {
    const nombre = await uploadFile(req.files, undefined, collection);
    model.img = nombre;
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
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
