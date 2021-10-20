// librerias de terceros
const {Router} = require('express');
const {  getAllEvents, ceateAnEvent, updateAnEvent, deleteAnEvent } = require('../controllers/events');
const router = Router();

const { validarJwt } = require('../middlewares/validar-Jwt');

// validamos que todas las rutas cumplan con el token 

router.use( validarJwt );

//validamos las rutas cons el jwt
router.get('/',getAllEvents );

router.post('/new',ceateAnEvent);

router.put('/update/:id',updateAnEvent);

router.delete('/delete/:id',deleteAnEvent);

module.exports = router;