const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, "El nombre es obligatorio"],
  },
  estado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  precio: { type: Number, default: 0 },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true }, //ref to categoria
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
  imgCloud: { type: String },
  imgLocal: { type: String },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, ...producto } = this.toObject();
  return producto;
  //esto es que cuando se mande a ejecutar el metodo del Schema toJson,
}; //el metodo toJSON se ejecuta cuando nos devuelve una coleccion mongoose
module.exports = model("Producto", ProductoSchema); //Mongoose siempre le suma la s al final por eso ponemos Usuario al hacer new Usuario
