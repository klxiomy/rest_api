const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { postUser, getUser, getUsers, putUser, getUserById, deleteUser } = require('../controller/user');
const { existsEmail, existsRole, existsUserById, verifyStateUser } = require('../middleware/db-validators');
const { validarJWT } = require('../middleware/validar-JWT');
const router = Router()

router.get('/', getUsers)
router.post('/',[
    check('name','El name es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('role','El role es obligatorio').not().isEmpty(),
    check('email','El email no es un email valido').isEmail(),
    check('password','La password debe tener minimo 6 letras').isLength({min:6}),
    check('email').custom(existsEmail),
    check('role').custom(existsRole),
    validateFields
], postUser)

router.put('/:id',[
    validarJWT,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('id').custom(existsUserById),
    check('id').custom(verifyStateUser),
    check('email','El email no es un email valido').isEmail(),
    check('password','La password debe tener minimo 6 letras').isLength({min:6}),
    check('email').custom(existsEmail),
    check('role').custom(existsRole),
    validateFields
],putUser)
router.get('/:id',[
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
],getUserById)

router.delete('/:id', [
    validarJWT,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('id').custom(existsUserById),
    validateFields 
],deleteUser)



module.exports=router