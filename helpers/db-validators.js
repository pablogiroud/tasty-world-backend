const Usuario = require("../models/usuario")
const Menu = require("../models/menu")
const Mesa = require("../models/mesa")


//Email 
const emailExiste = async (email="") =>{
    const emailExiste = await Usuario.findOne({email})

    if(emailExiste){
        throw new Error(`El email ${email} ya se encuentra registrado`)
    }
};

const idUsuarioExiste = async (id) =>{
    const usuarioExiste = await Usuario.findById(id)

    if(!usuarioExiste){
        throw new Error(`El id ${id} no existe`)
    }
};

//Menu
const nombreMenuExiste = async (nombre="") =>{
    const nombreMenuExiste = await Menu.findOne({nombre})

    if(nombreMenuExiste){
        throw new Error(`El menu ${nombre} ya se encuentra registrado`)
    }
};


const idMenuExiste = async (id) =>{
    const menuExiste = await Usuario.findById(id)

    if(!menuExiste){
        throw new Error(`El id ${id} no existe`)
    }
};

//mesas
const idMesaExiste = async (id) =>{
    const mesaExiste = await Mesa.findById(id)

    if(!menuExiste){
        throw new Error(`El id ${id} no existe`)
    }
};

module.exports={
    emailExiste,
    idUsuarioExiste,
    nombreMenuExiste,
    idMenuExiste,
    idMesaExiste
}