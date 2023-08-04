const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs')


const postUser = async (req,res) => {
    const {email,name, password, role} = req.body

    const user = new User({email,name,password,role})
    
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json('Usuario creado correctamente')
}

const getUsers = async (req,res) => {

    try {
        const user = await User.find({state:true})
        if(user === []){
            res.status(404).json('No hay usuarios registrados')
        }  
        res.json(user)
    } catch (error) {
        console.log(error);
    }
    
}
const getUserById = async (req,res) => {
    const {id} = req.params
    const user = await User.findById(id)
    if(!user.state){
        return res.json('El usuario se encuentra inhabilidato')
    }
    res.json(user)
}
const putUser = async (req,res) => {
    try {
        const {id} = req.params
        const {_id, password, ...rest} = req.body;
    
        if(password){
            const salt = bcryptjs.genSaltSync()
            rest.password = bcryptjs.hashSync(password, salt)  ;
        }
        const user = await User.findByIdAndUpdate(id, rest,{new:true})
        res.status(201).json('Usuario actualizado correctamente') 
    } catch (error) {
        console.log(error);
    }
}
const deleteUser = async (req,res) => {
    const {id} = req.params;
    const user= await User.findByIdAndUpdate(id,{state:false},{new:true})
    res.json('Usuario eliminado correctamente')
}

module.exports = {
    postUser,
    getUsers,
    getUserById,
    putUser,
    deleteUser
}