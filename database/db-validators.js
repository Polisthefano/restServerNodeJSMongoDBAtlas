const Role = require("../models/role.model");
const usuarioModel = require("../models/usuario.model");
const roleDBValidator = async (rol) => {
  //los check custom permite hacer funciones personalizadas, usan un callback en este caso busco en los roles que estan en db
  if (rol?.length >= 0) {
    const role = rol.trim();
    const existeRol = await Role.findOne({ rol: role }); //busca el documento cuyo rol sea igual
    if (!existeRol) {
      throw new Error(`El rol ${role} no es correcto`); //asi funciona express para retornar errores personalizados
    }
  }
};
const emailDBValidador = async (email = "") => {
  const existeEmail = await usuarioModel.findOne({ correo: email });
  if (existeEmail) {
    throw new Error("Ese email " + email + " ya se encuentra registrado");
  }
};
const IdDBValidador = async (_id = "") => {
  const existeID = await usuarioModel.findOne({ _id });
  if (!existeID) {
    throw new Error("Ese ID " + _id + " no pertenece a un usuario existente");
  }
};
module.exports = { roleDBValidator, emailDBValidador, IdDBValidador };
