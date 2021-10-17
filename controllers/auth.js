const { response} = require('express');
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req, res=response) => {


    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email});
        
        if(usuario) {
            return res.status(400)
                .json({ 
                    ok: false,
                    msg: 'El correo ya ha sido registrado' 

                })
        }

        usuario = new Usuario(req.body);
            // recive el numero de vuletas que le hara a la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

         await usuario.save();
   
           res.status(201).json({
            
            ok: true,
            uid: usuario._id,
            name: usuario.name,
       });

    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            ok: false,
            msg: 'No se creo'
        });
    }

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