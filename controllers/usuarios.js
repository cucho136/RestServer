const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async(req, res = response) => {

    //const {q, b} = req.query
    const {limite = 4, desde =0} = req.query;
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({ estado: true})
        .skip(Number(desde))
        .limit(Number(limite))

    ]);
    
    res.json({
        total,
        usuarios
    });
  }

const usuariosPost = async (req= request, res = response) => {




    const {nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

/*     const existeEmail = await Usuario.findOne({ correo});
    if (existeEmail){
        return res.status(400).json({
            msg:'Ese correo ya esta registrado'
        });
    } */

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);


    await usuario.save ();



    res.json({
        ok:true,
        msg: 'Post API - controllador',
        usuario
    });
  }

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id,password, google, correo, ...resto} = req.body;

    //validar con la base de dato

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    
res.json({
    usuario
});
}

const usuariosPatch = (req, res = response) => {
res.json({
    ok:true,
    msg: 'Patch API - controllador'
});
}
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //fisicamente

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario= await Usuario.findByIdAndUpdate(id, {estado:false});

res.json({
    usuario
});
}



  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosPatch,
      usuariosDelete
  }