const { Schema, model } = require("mongoose");
const CategoriaSchema = Schema({
  nombre: { type: String, required: [true, "El nombre es obligatorio"] },
  estado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }, //quiere decir que es una referencia a un usuario, ref es el nombre la coleccion a la que nos referimos
});

module.exports = model("Categoria", CategoriaSchema); //Mongoose siempre le suma la s al final por eso ponemos Usuario al hacer new Usuario
