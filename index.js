const express = require('express');
const { connectToDB } = require('./database/db-conf');
const app = express();

// importamos el env
require('dotenv').config();

// midleware de los archivos publicos
// Directorio publico 
app.use( express.static('public'))

//conexion a la DB

connectToDB();

//  Parseo de los json a un objeto vaido
app.use( express.json());
// Rutas de autenticacion
app.use('/api/auth', require('./routes/auth'));


app.listen( process.env.PORT  , ()=> {
    console.log('listening on port ' + process.env.PORT)
});