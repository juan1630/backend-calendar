const { response} = require('express');
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');

// imports mios
const { createJwt } = require('../helppers/jwt')




const createUser = async (req, res=response) => {

    const { email, password } = req.body;
    try {
        
        let usuario = await Usuario.findOne({ email});
        
        if(usuario) {
            return res.status(400)
                .json({ 
                    ok: false,
                    msg: 'El correo ya ha sido registrado' 

                });
        }

        usuario = new Usuario(req.body);
            // recibe el numero de vuletas que le hara a la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

         await usuario.save();
        // generamos el jwt 

        const token = await createJwt(usuario._id, usuario.name);

           res.status(201).json({
            
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
       });

    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            ok: false,
            msg: 'No se creo'
        });
    }

}


const loginUser = async (req, res= response) => {

    const {  email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email})

        if( !usuario) {
            return res.status(400)
            .json({
                ok: false,
                msg: 'Usuario y contraseña no son correctos'
            });
        }


        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400)
            .json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        // genear el jwt
        const token  = await createJwt(usuario._id, usuario.name);

        return res.status(200)
        .json({
            ok:true,
            msg: 'Acceso',
            uid: usuario._id,
            name: usuario.name,
            token
        })

    } catch (error) {

        console.error(error);
        
        res.status(500).json({
            ok: false,
            msg: 'No se pudo acceder'
        });
    }
 
}



const revalidateToken = async(req, res) => {


    const { uid, name } = req;  
    const token  = await createJwt(uid, name);


    res.json({
        ok: true,
        message: 'Renew de token',
        uid, 
        name,
        token
    });

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}