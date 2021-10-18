// librerias de terceros
const {Router} = require('express');
const router = Router();
const { valiateFileds } = require('../middlewares/field-validators')
const { createUser, revalidateToken, loginUser } = require('../controllers/auth')
// el check se encarga de validar los campo uno por uno
// Respuestas de las fucniones

const {  check } = require('express-validator');

router.post('/new', 
[
    //validamos que el nombre sea obligatorio 
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6}),
    valiateFileds
],
    createUser );

router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').isLength({ min: 6 }),
    valiateFileds
],loginUser );

router.get('/renew', revalidateToken );

module.exports = router