const { response} = require('express');


const createUser = (req, res=response) => {
    
    const { email, password } = req.body;

   
    //validamos si es que hay errores retorne los errores
 
  
    res.status(201).json({
        ok: true,
        message: 'Register',
        email, 
        password 
    });
}


const loginUser = (req, res) => {

    const { name, email, password } = req.body;

    
 
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