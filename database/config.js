const mongoose=require('mongoose')
const dbConnection=async()=>{
try{
    connect=await mongoose.connect(process.env.CONNMONGODBATLAS)
    console.log('Conectado a la base de datos');
}catch(error){
    console.log(error);
    throw new Error("Error a la hora de conectar con la base de datos") //forma de lanzar errores
}
}    
module.exports={dbConnection}