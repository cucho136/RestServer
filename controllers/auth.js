const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req = request, res=response) =>{

    const { correo, password} = req.body;

    try {

        //verificar si exiate
        const usuario = await Usuario.findOne({correo})
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- correo'
            });
        } 

        //esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- estado:false'
            });
        }


        const validarClave = bcryptjs.compareSync( password, usuario.password)

        if (!validarClave){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- password:false'
            });

        }

        const token = await generarJWT( usuario.id);
    
        res.json({
            usuario,
            token
    
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Hable con el admin."
        })
        
    }



}





module.exports = {
    login
}