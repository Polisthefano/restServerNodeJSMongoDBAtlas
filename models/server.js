const express = require('express')
const cors = require('cors')
class Server { //server orientado a objetos

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosRoutePath = '/api/usuarios'
            //middlewares
        this.middlewares();
        //rutas
        this.routes()
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