const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server { //server orientado a objetos

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosRoutePath = '/api/usuarios'
        //conexion a la base de datos
          this.conectarDB()  
        //middlewares
        this.middlewares();
        //rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }
    middlewares() {
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())
            //directorio publico
        this.app.use(express.static('public')) //use dice que vamos a usar un middleware
            //lo corre en la ruta / path vacio
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/usuario.routes')) //middleware de tipo route donde va la ruta y la 
            //llamada al archivo de rutas
    }
    listen() {
        this.app.listen(this.port)
    }
}
module.exports = Server;