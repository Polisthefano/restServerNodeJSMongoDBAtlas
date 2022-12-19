const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const { swaggerDocs } = require("../swager");
const fileUpload = require("express-fileupload");
class Server {
  //server orientado a objetos

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.urlBase = "/api/";
    this.paths = {
      usuarios: this.urlBase + "usuarios",
      auth: this.urlBase + "auth",
      categorias: this.urlBase + "categorias",
      productos: this.urlBase + "productos",
      buscar: this.urlBase + "buscar",
      uploads: this.urlBase + "uploads",
    };
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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuario.routes")); //middleware de tipo route donde va la ruta y la
    //llamada al archivo de rutas
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categorias, require("../routes/categorias.routes"));
    this.app.use(this.paths.productos, require("../routes/productos.routes"));
    this.app.use(this.paths.buscar, require("../routes/buscar.routes"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
  }
  listen() {
    this.app.listen(this.port);
    swaggerDocs(this.app, this.port);
  }
}
module.exports = Server;
