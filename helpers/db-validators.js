const Role= require('../models/role');
const usuario = require('../models/usuario');


const esRolevalido = async (rol ='' )=>{
    const existeRol = await Role.findOne({ rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos.`)
    }
}

const MailExiste = async (correo='') =>{


    const existeEmail = await usuario.findOne({ correo});
    if (existeEmail){
        throw new Error(`El ${correo} correo ya esta registrado`)
        
    }
}


const existeUsuarioPorId = async (id) =>{


    const existeId = await usuario.findById(id);
    if (!existeId){
        throw new Error(`El ${id}  no existe.`)
        
    }
}








module.exports ={
    esRolevalido,
    MailExiste,
    existeUsuarioPorId
}