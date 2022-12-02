const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Categoria, Producto, Usuario } = require("../models");

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoID = isValidObjectId(termino); //Devuelve true si es mongoID valido
  if (isMongoID) {
    const usuario = await Usuario.findById(termino);
    return usuario;
  }
};

const buscar = async (req, res = response) => {
  const { collecion, termino } = req.params;
  const response = { results: [] };
  switch (collecion) {
    case "categorias":
      break;
    case "usuarios":
      const usuarios = await buscarUsuarios(termino);
      response.results = usuarios ? [usuarios] : [];
      return res.status(200).json(response);
      break;
    case "productos":
    default:
      res.status(500).json("No desarrollada la busqueda para esta collecion");
  }
};
module.exports = { buscar };
