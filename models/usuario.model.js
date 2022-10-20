const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  //este modelo permite crear un usuario a insertar en la db solo tomando estos datos, crea la colleccion pero necesita el .save() para guardarse
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true }, //unique bloquea que no haya correos repetidos
  password: { type: String, required: true },
  img: { type: String },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE", "SUPER_ROLE"],
  }, //enum es que solo esos dos tipos son permitidos en la DB
  estado: { type: Boolean, default: true },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  //esto es que cuando se mande a ejecutar el metodo del Schema toJson,
  //va a ejecutar eso, aqui en este modelo y de esta manera podemos reemplazar el contenido de cualquier funcion de mongoose
  const { __v, password, _id, ...usuario } = this.toObject(); //de esta forma quita los dos primeros atributos y guarda en usuario todo el resto
  usuario.uid = _id;
  return usuario;
}; //el metodo toJSON al parece se ejecuta sin que lo llamemos

module.exports = model("Usuario", UsuarioSchema); //Mongoose siempre le suma la s al final por eso ponemos Usuario al hacer new Usuario
