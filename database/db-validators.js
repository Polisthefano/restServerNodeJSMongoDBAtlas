const Role=require('../models/role.model')
const usuarioModel = require('../models/usuario.model')
const roleDBValidator=async (rol='')=>{ //los check custom permite hacer funciones personalizadas, usan un callback en este caso busco en los roles que estan en db
    const existeRol=await Role.findOne({rol}) //busca el documento cuyo rol sea igual
    if(!existeRol){
        throw new Error(`El rol ${rol} no es correcto`) //asi funciona express para retornar errores personalizados
    }
}
const emailDBValidador=async(email='')=>{
    const existeEmail= await usuarioModel.findOne({correo:email})
    if(existeEmail){
        throw new Error('Ese email '+email +' ya se encuentra registrado')
            }
}
module.exports={roleDBValidator,emailDBValidador}