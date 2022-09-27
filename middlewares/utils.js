 /**middleware personalizado para loguear cada vez que entra una request */
 const loguearRequest=(req, res, next) => {
    console.log(`Ingresa request al path ${JSON.stringify(req.route?.path)} desde IP ${req.ip} con headers ${JSON.stringify(req.headers)}, tipo: ${req.method} y body: ${JSON.stringify(req.body)}`);
    return next();
}
module.exports={loguearRequest}