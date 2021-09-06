const {request, response} = require('express');
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');

const usuariosGet=(req = request, res = response)=>{
    res.json({
        msg:"GET usuarios"
    });
}

const usuariosPost = async (req = request, res = response)=>{
    
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({nombre, email, password, rol });

    //encriptacion bcrypt
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg:"Nuevo Tasty fan creado",
        usuario
    });
}

const usuariosPut = async (req = request, res = response)=>{
    
    const id = req.params.id;
    const {_id,email,rol,password, ...resto} = req.body;
    
    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})
    res.json({
        msg:"Put usuarios",
        usuario,
    });
}

const usuariosDelete = async (req = request, res = response)=>{
    
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg:"Un tasty fan menos",
        usuario
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};