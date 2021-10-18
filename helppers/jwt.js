const jwt = require('jsonwebtoken');



const createJwt = ( uid, name ) => {

    //creamos la promesa que va a retornar
    return new Promise((resolve, reject) => {

        //creamos el payload
        const payload = { uid, name };

        //hacemos la firma del token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '30h'
        }, (err, token) => {

            //si da un error damos el reject de la promesa
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            //sino reolvemos con el resolve de la promesa
            resolve(token);
        });


    });

}


module.exports = {
    createJwt
};
