const { validationResult } = require('express-validator')
//middleware personalizado, los middlewares al ser llamados en la route reciben req y retornan resp, si hacemos res.status se corta la ejecucion de los siguientes middlewares y/o controlador
const validarCampos=(req,res,next)=>{
    const erroresDeValidacion=validationResult(req) //validation result trae todos los errores de los check de la libreria express validator
    if(!erroresDeValidacion.isEmpty()){
        return res.status(400).json(
            erroresDeValidacion,
           
           )
    }
    next(); //necesario en los middlewares para decirle que si todo salio bien, siga con el siguiente middleware o controlador si no hay mas middlewares
}
module.exports=validarCampos