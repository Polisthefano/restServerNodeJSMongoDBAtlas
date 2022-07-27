const Role=require('../models/role.model')
const roleDbValidator=async (rol='')=>{ //los check custom permite hacer funciones personalizadas, usan un callback en este caso busco en los roles que estan en db
    const existeRol=await Role.findOne({rol}) //busca el documento cuyo rol sea igual
    if(!existeRol){
        throw new Error(`El rol ${rol} no es correcto`) //asi funciona express para retornar errores personalizados
    }
}
module.exports={roleDbValidator}