const express = require('express');
const app = express();
// importamos el env
require('dotenv').config();


// midleware de los archivos publicos
// Directorio publico 
app.use( express.static('public'))

app.listen( process.env.PORT  , ()=> {
    console.log('listening on port ' + process.env.PORT)
});