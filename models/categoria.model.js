const { Schema, model } = require("mongoose");
const CategoriaSchema = Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, "El nombre es obligatorio"],
  },
  estado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }, //quiere decir que es una referencia a un usuario, ref es el nombre la coleccion a la que nos referimos
});

CategoriaSchema.methods.toJSON = function () {
  //esto es que cuando se mande a ejecutar el metodo del Schema toJson,
  //va a ejecutar eso, aqui en este modelo y de esta manera podemos reemplazar el contenido de cualquier funcion de mongoose, find ny id o la que sea
  const { __v, ...categoria } = this.toObject();
  return categoria;
}; //el metodo toJSON se ejecuta cuando nos devuelve una coleccion mongoose

module.exports = model("Categoria", CategoriaSchema); //Mongoose siempre le suma la s al final por eso ponemos Usuario al hacer new Usuario
