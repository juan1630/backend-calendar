// librerias de terceros
const {Router} = require('express');
const router = Router();

//rutas internas

const { valiateFileds } = require('../middlewares/field-validators')
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
const { validarJwt } = require('../middlewares/validar-Jwt')
// el check se encarga de validar los campo uno por uno
// Respuestas de las fucniones

const {  check } = require('express-validator');


// crear un nuevo usuario en la aplicacion
router.post('/new', 
[
    //validamos que el nombre sea obligatorio 
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6}),
    valiateFileds
],
    createUser );
    
// login en la aplicacion
router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6 }),
    valiateFileds
],loginUser );

// regeneramos un token
router.get('/renew',validarJwt ,revalidateToken );

module.exports = router