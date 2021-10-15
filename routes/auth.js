// librerias de terceros
const {Router} = require('express');
const router = Router();
const {  check } = require('express-validator');
// el check se encarga de validar los campo uno por uno
// Respuestas de las fucniones
const { createUser, revalidateToken, loginUser } = require('../controllers/auth')


router.get('/new', 
[
    //validamos que el nombre sea obligatorio 
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6})
],
    createUser );

router.post('/', [
    check('name', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6 }),
],loginUser );

router.get('/renew', revalidateToken );

module.exports = router