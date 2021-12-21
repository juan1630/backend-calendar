const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validarJwt = (req = request, resp =response ,next) => {

    //leemos el token que se envia por el req
    const  token  = req.header('x-token');

    if(!token){
        return resp.status(401)
        .json({ 
            ok: false,
            msg : 'No tienes las credenciales',
            name:null
        });
    }

    try {
        //hacemos el destructuring de los datos
        const {uid, name} = jwt.verify(  token,  process.env.SECRET_JWT_SEED );
        //seteamos los datos al request
        req.uid =  uid;
        req.name = name;
        
    } catch (error) {
        return resp.status(401).json({ 
                                        ok: false, 
                                        msg: 'Token no valido'
                                    });
    }
    
    next();
}


module.exports = {validarJwt};

