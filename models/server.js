const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const { swaggerDocs } = require("../swager");
class Server {
  //server orientado a objetos

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/usuarios";
    this.authPath = "/api/auth";
    //conexion a la base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public")); //use dice que vamos a usar un middleware
    //lo corre en la ruta / path vacio
  }

  routes() {
    this.app.use(this.usuariosRoutePath, require("../routes/usuario.routes")); //middleware de tipo route donde va la ruta y la
    //llamada al archivo de rutas
    this.app.use(this.authPath, require("../routes/auth.routes"));
  }
  listen() {
    this.app.listen(this.port);
    swaggerDocs(this.app, this.port);
  }
}
module.exports = Server;
