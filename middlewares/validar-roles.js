const esAdminRol = (req, res, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json("Se quiere verificar el rol sin verificar el token");
  }
  const usuario = req.usuario;
  if (req.usuario.rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json(
        `${usuario.nombre} no tiene permisos de administrador - No puede realizar esta acción`
      );
  }
  next();
};

//middleware con parametros personalizados
const tieneRole = (...roles) => {
  //usar spread aca es como si usara un operador que se llama rest, lo que hace es vos le podes pasar muchos parametros y los junta en un array
  //genera el mismo efecto que pasar un array y esperar un array
  return (req, res, next) => {
    if (!req.usuario) {
      return res
        .status(500)
        .json("Se quiere verificar el rol sin verificar el token");
    }
    const usuario = req.usuario;
    if (!roles.includes(usuario.rol)) {
      return res
        .status(401)
        .json(
          `Es requerido alguno de estos roles ${roles} - No puede realizar esta acción`
        );
    }
    return next();
  };
};
module.exports = { esAdminRol, tieneRole };
