const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller')

const {loguearRequest}=require('../middlewares/utils')
const validarCampos=require('../middlewares/validar-campos')
const { roleDBValidator, emailDBValidador } = require('../database/db-validators') //callback de validacion personalizada del rol

const router = Router()
router.get('', usuariosGet)
router.put('/:id', usuariosPut) //forma de pasar parametros por la url

router.post('', [
    check('nombre','El nombre es requerido').not().isEmpty(), //not niega toda condicion que pongan despues
    check('password','El password debe contener mas de 6 caracteres').isLength({min:6}), //contrasena min length
    check('correo','El correo no es valido').isEmail(), //debe ser email
    check('correo').custom(emailDBValidador),
    check('rol').custom(roleDBValidator),
    // check('rol','No es un rol válido').isIn(['USER_ROLE','ADMIN_ROLE']), //si existe en ese array
    loguearRequest,validarCampos],usuariosPost) //en el medio entre el path y el controllador van el array de middleware o funciones que se ejecutan antes del controlador
    
router.delete('', usuariosDelete)
router.patch('', usuariosPatch)
module.exports = router;