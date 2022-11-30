const { Role, Usuario, Categoria, Producto } = require("../models/index");
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
  return exists(
    _id,
    "USUARIO",
    "Ese ID " + _id + " no pertenece a un usuario existente"
  );
};

const existeCategoria = async (_id = "") => {
  return exists(
    _id,
    "CATEGORIA",
    "Ese ID " + _id + " no pertenece a una categoria existente"
  );
};

const existeProducto = async (_id = "") => {
  return exists(
    _id,
    "PRODUCTO",
    "Ese ID " + _id + " no pertenece a un producto existente"
  );
};

const exists = async (_id = "", collection, message) => {
  const error = new Error(message);
  try {
    let existeID = true;
    switch (collection) {
      case "PRODUCTO":
        existeID = await Producto.findOne({ _id });
        break;
      case "USUARIO":
        existeID = await Usuario.findOne({ _id });
        break;
      case "CATEGORIA":
        existeID = await Categoria.findOne({ _id });
        break;
    }
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
  existeProducto,
};
