const jwt = require('jsonwebtoken');
const User = require('../models/user')
//valido el token
const validarJWT = async(req, res, next) => {
    try {
    const token = req.header('x-token')
        if(!token){
            return res.status(400).json({msg:'El token es requerido'})
        }
    const {uid} = jwt.verify(token, process.env.SECRETOPRIMARYKEY)
    const user = await User.findById(uid)    
    if (!user) {
        return res.status(400).json({
            msg: 'El token no es valido- el user no existe'
        })
    }

    if (!user.state) {
        return res.status(400).json({
            msg: 'El token no es valido- el user no tiene acceso -estado'
        })
    }
    if(user.role !=='ADMIN'){
        return res.status(400).json({
            msg: 'El token no es valido- el user no tiene acceso -rol'
        }) 
    }
    req.user = user;
    next()
    } catch (error) {
        res.status(404).json('No se puede leer el token')
    }
}
module.exports= {
    validarJWT
}