const mongoose = require('mongoose');


const dbConection = async ( ) =>{
    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
    
    console.log('bases de datos online');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de dato');
        
    }

}



module.exports ={
    dbConection
}