const { Role, Usuario, Categoria } = require("../models/index");
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
  const existeEmail = await Usuario.findOne({ correo: email });
  if (existeEmail) {
    throw new Error("Ese email " + email + " ya se encuentra registrado");
  }
};
const IdDBValidadorUsuario = async (_id = "") => {
  return exists(_id, "USUARIO");
};

const existeCategoria = async (_id = "") => {
  return exists(_id, "CATEGORIA");
};

const exists = async (_id = "", collection) => {
  const msg =
    collection === "USUARIO"
      ? "Ese ID " + _id + " no pertenece a un usuario existente"
      : "Ese ID " + _id + " no pertenece a una categoria existente";
  const error = new Error(msg);
  try {
    const existeID =
      collection == "USUARIO"
        ? await Usuario.findOne({ _id })
        : await Categoria.findOne({ _id });
    if (!existeID) {
      throw error;
    }
  } catch {
    throw error;
  }
};
module.exports = {
  roleDBValidator,
  emailDBValidador,
  IdDBValidadorUsuario,
  existeCategoria,
};
