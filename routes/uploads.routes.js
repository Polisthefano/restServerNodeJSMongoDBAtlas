const { Router } = require("express");
const { cargarArchivo } = require("../controllers/uploads.controller");
const { check } = require("express-validator");
const { loguearRequest } = require("../middlewares/index");
const router = Router();

router.post("/", [loguearRequest], cargarArchivo);

module.exports = router;
