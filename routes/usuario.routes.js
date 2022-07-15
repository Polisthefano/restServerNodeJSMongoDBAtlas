const { Router } = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller')

const router = Router()
router.get('', usuariosGet)
router.put('/:id', usuariosPut) //forma de pasar parametros por la url
router.post('', usuariosPost)
router.delete('', usuariosDelete)
router.patch('', usuariosPatch)
module.exports = router;