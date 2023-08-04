const User = require('../models/user');
const Role = require('../models/role');

const existsEmail = async (email=''  )=> {
    const user = await User.findOne({email})
    if(user){
        throw new Error('El email ya existe')
    }
}

const existsUserById= async (id) => {
    const user = await User.findById(id)
    if(!user){
        throw new Error('El usuario no existe')
    }
}
const existsRole= async(role= '') => {
    const existRol = await Role.findOne({role})
    if(!existRol){
        throw new Error('El rol no existe')
    }
}

const verifyStateUser= async (id)=> {
    const user = await User.findById(id)
    if(!user.state){
        throw new Error('El usuario esta inhabilitado')
    }
}
module.exports = {
    existsEmail,
    existsUserById,
    existsRole,
    verifyStateUser
}

