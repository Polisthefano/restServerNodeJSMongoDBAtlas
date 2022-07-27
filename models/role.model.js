/**Coleccion role */
const {Schema,model}= require ('mongoose')
const rolSchema=Schema({ 
rol:{type:String,required:[true,"El rol es obligatorio"]}, 

})
module.exports=model('Role',rolSchema) 