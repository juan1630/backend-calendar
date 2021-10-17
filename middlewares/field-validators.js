const { response  } = require('express');
const { validationResult } =require('express-validator')


const valiateFileds = (req, resp= response, next) => {

    console.log( req.body )

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    // el next se ejecuta cuando la respuesta es satisfactoría y ejecuta el siguiente middleware
    next();
}


module.exports = {
    valiateFileds
}