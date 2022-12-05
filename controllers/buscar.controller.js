const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Categoria, Producto, Usuario } = require("../models");

const buscarEnCollecion = async (
  termino = "",
  coleccion = "",
  query = {},
  populate = null
) => {
  const isMongoID = isValidObjectId(termino); //Devuelve true si es mongoID valido
  if (isMongoID) {
    const result = await coleccion.findById(termino);
    return result ? [result] : [];
  }

  const results = !populate
    ? await coleccion.find(query)
    : await coleccion
        .find(query)
        .populate(populate.collection, populate.fields);
  return results;
};

const buscar = async (req, res = response) => {
  const { collecion, termino } = req.params;
  const regExp = new RegExp(termino, "i"); //hace una expresion regular donde le dice por medio de 'i' que es insensible a mayusculas y minusculas
  const response = { results: [], totalResults: 0 };
  switch (collecion) {
    case "categorias":
      const categorias = await buscarEnCollecion(
        termino,
        Categoria,
        {
          $or: [{ nombre: regExp, estado: true }],
        },
        { collection: "usuario", fields: ["nombre", "id"] }
      );
      response.results = categorias;
      break;
    case "usuarios":
      const usuarios = await buscarEnCollecion(termino, Usuario, {
        $or: [{ nombre: regExp }, { correo: regExp }], //de esta forma mediante mongoose, y con el $or decimos que busque nombre o correo
        $and: [{ estado: true }], //y que cumpla eso
      });
      response.results = usuarios;
      break;
    case "productos":
      const productos = await buscarEnCollecion(
        termino,
        Producto,
        {
          $or: [{ nombre: regExp, estado: true }],
        },
        { collection: "categoria", fields: ["nombre", "id"] }
      );
      response.results = productos;
      break;
    default:
      res.status(500).json("No desarrollada la busqueda para esta collecion");
  }

  response.totalResults = response.results.length;
  return res.status(200).json(response);
};
module.exports = { buscar };
