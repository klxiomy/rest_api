const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()


const conectionDB = async () => {
   try {
    await mongoose.connect(process.env.CONECTIONDB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        family:4 
     });
     console.log('Base de datos conectada');
   } catch (error) {
    console.log('error al conectar la base de datos',error);
    throw new Error('Error al conectar la base de datos')
   }
}

module.exports = {
    conectionDB
}