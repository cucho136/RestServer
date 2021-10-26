const cors = require('cors');
const express = require('express')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath= '/api/usuarios';

        //middlewares
        this.middlewares();



        this.routes();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use( express.json());

        this.app.use( express.static('public'))
    }

    routes(){

        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'));
    
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}



module.exports = Server;