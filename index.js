const express = require('express');
const { connectToDB } = require('./database/db-conf');
const app = express();
const cors = require('cors');
// importamos el env
require('dotenv').config();

//conexion a la DB
connectToDB();

app.use( cors() );
// midleware de los archivos publicos
// Directorio publico 
app.use( express.static('public'))


//  Parseo de los json a un objeto vaido
app.use( express.json());
// Rutas de autenticacion
app.use('/api/auth', require('./routes/auth'));

// Ruta del crud de los eventos
app.use('/api/events', require('./routes/events')); 

app.listen( process.env.PORT  , ()=> {
    console.log('listening on port ' + process.env.PORT)
});