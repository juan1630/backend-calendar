const express = require('express');

const app = express();
//Rutas

app.get('/', (req, res) => {

    return resp.json({
        ok: true
    })

});

app.listen( 3001  , ()=> {
    console.log('listening on port 3001')
});