// librerias de terceros
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');

const { isDate } = require('../helppers/isDate');
const {  getAllEvents, ceateAnEvent, updateAnEvent, deleteAnEvent } = require('../controllers/events');
const { validarJwt } = require('../middlewares/validar-Jwt');
const { valiateFileds } = require('../middlewares/field-validators');
// validamos que todas las rutas cumplan con el token 

router.use( validarJwt );

//validamos las rutas cons el jwt
router.get('/',getAllEvents );

router.post('/new', 
                [
                    check('title', 'El titulo es obligatorio').not().isEmpty(),
                    check('start','La fecha de inicio es requerida').custom( isDate),
                    check('end','La fecha de termino es requerida').custom( isDate),
                    valiateFileds
                ],
                ceateAnEvent);

router.put('/update/:id',  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es requerida').custom( isDate),
    check('end','La fecha de termino es requerida').custom( isDate),
    valiateFileds
],updateAnEvent);

router.delete('/delete/:id',deleteAnEvent);


//la funcion custom ejecuta un callback
module.exports = router;