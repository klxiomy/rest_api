const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { login } = require('../controller/auth');


const router = Router()

router.post('/',[
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),  
    check('email','El email no es un email valido').isEmail(),
    check('password','La password debe tener minimo 6 letras').isLength({min:6}),
    validateFields
],login)

module.exports=router