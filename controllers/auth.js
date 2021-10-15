const { response} = require('express');
const {validationResult } = require('express-validator');

const createUser = (req, res=response) => {
    
    const { email, password } = req.body;

    const errors = validationResult(req);
    //validamos si es que hay errores retorne los errores
 
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    res.status(201).json({
        ok: true,
        message: 'Register',
        email, 
        password 
    });
}


const loginUser = (req, res) => {

    const { name, email, password } = req.body;

    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        message: 'login',
        name, 
        email, 
        password
    })
}



const revalidateToken = (req, res) => {
    res.json({
        ok: true,
        message: 'Renew de token',
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}