const {Schema,model}= require ('mongoose')
const UsuarioSchema=Schema({ //este modelo permite crear un usuario a insertar en la db solo tomando estos datos, crea la colleccion pero necesita el .save() para guardarse
nombre:{type:String,required:true},
correo:{type:String,required:true,unique:true}, //unique bloquea que no haya correos repetidos
password:{type:String,required:true},
img:{type:String},
rol:{type:String,required:true,enum:['ADMIN_ROLE','USER_ROLE']}, //enum es que solo esos dos tipos son permitidos en la DB
estado:{type:Boolean,default:true},
google:{
    type:Boolean,default:false
}})
module.exports=model('Usuario',UsuarioSchema) //Mongoose siempre le suma la s al final por eso ponemos Usuario