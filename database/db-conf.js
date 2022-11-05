const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async() => {
    try {
      await mongoose.connect( process.env.DB_CONN , {
            useNewUrlParser: true,
        });
        
        console.log('Db online', process.env.DB_CONN);

    } catch (error) {
        
        console.error(error);
        throw new Error('Error en la conexion')
    }
}


module.exports = {
    connectToDB
}