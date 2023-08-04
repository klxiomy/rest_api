const { generateJwt } = require("../middleware/generate-JWT");
const User = require("../models/user");
const bcryptjs = require('bcryptjs')


const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
        return res.status(400).json({msg:'Usuario/password incorrectos -email'})
        } 
        if(!user.state){
       return res.status(400).json({msg:'Usuario/password incorrectos -state'})
        }
        const verificatePassword = bcryptjs.compare(password, user.password)
        if(!verificatePassword){
       return res.status(400).json({msg:'Usuario/password incorrectos -password'})
        }

        const token = await generateJwt(user.id)
        res.json({token, mensaje:'Login Correcto✔'})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login
}
