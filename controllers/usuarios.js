const { response } = require('express');



const usuariosGet = (req, res = response) => {

    const {q, b} = req.query
    res.json({
        ok:true,
        msg: 'get API - controllador',
        q,
        b
    });
  }

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;



    res.json({
        ok:true,
        msg: 'Post API - controllador',
        nombre,
        edad
    });
  }

const usuariosPut = (req, res = response) => {

    const {id} = req.params
res.json({
    ok:true,
    msg: 'Put API - controllador',
    id
});
}

const usuariosPatch = (req, res = response) => {
res.json({
    ok:true,
    msg: 'Patch API - controllador'
});
}
const usuariosDelete = (req, res = response) => {
res.json({
    ok:true,
    msg: 'Delete API - controllador'
});
}



  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosPatch,
      usuariosDelete
  }