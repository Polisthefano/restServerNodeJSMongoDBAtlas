/**middleware personalizado para loguear cada vez que entra una request */
const loguearRequest = (req, res, next) => {
  console.log(
    `Ingresa request al path ${JSON.stringify(req.route?.path)} desde IP ${
      req.ip
    } con headers ${JSON.stringify(req.headers)}, tipo: ${
      req.method
    } y body: ${JSON.stringify(req.body)}`
  );
  return next();
};

//permite pasara parametros a un middleware personlizado
// const numberNotNegativeIfExist = (parameters) => {
//   return (req, res, next) => {
//     if (req.body[parameters.field] && req.body[parameters.field] < 0) {
//       res.status(402).json(`El campo ${parameters.field} debe ser mayor a 0`);
//       return;
//     }
//     return next();
//   };
// };
module.exports = { loguearRequest };
