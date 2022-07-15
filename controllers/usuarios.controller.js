const { response, request } = require('express') //al importar esto y poner res=response y req=request hace que vscode 
    //me sugiera .status .send etc
const usuariosGet = (req = request, res = response) => {
    //ejemplo api/usuarios?nombre=sthefano&apikey=1231
    //lo bueno de desestructurar es que si no viene por ejemplo nombre, por defecto ponemos sin nombre
    const {nombre='Sin nombre',apikey}=req.query //aca vienen los query params, son los que mandamos en la url con ? el primero y despuse & para concatenar
    res.status(200).json({ //status para retornar el codigo, el 200 si no mandas nada es el default
        msg: 'get API',
        nombre,apikey
    })
}
const usuariosPost = (req, res = response) => {
    const {nombre,edad}=req.body //aca viene el body
    res.status(200).json( //status para retornar el codigo, el 200 si no mandas nada es el default
        {nombre,edad}
    )
}
const usuariosPut = (req, res = response) => {
    const id=req.params.id //parametros pasados por la url ejemplo api/usuarios/1
    res.status(200).json({ //status para retornar el codigo, el 200 si no mandas nada es el default
        msg: 'put API',
        id
    })
}
const usuariosDelete = (req, res = response) => {
    res.status(200).json({ //status para retornar el codigo, el 200 si no mandas nada es el default
        msg: 'delete API'
    })
}
const usuariosPatch = (req, res = response) => {
    res.status(200).json({ //status para retornar el codigo, el 200 si no mandas nada es el default
        msg: 'patch API'
    })
}
module.exports = { usuariosGet, usuariosPatch, usuariosPost, usuariosPut, usuariosDelete }