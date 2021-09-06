const {request, response}= require('express')
const Mesa=require("../models/mesa")

const mesasGet = async (req = request, res = response)=>{
    
    const mesa= await Mesa.find({estado: true})

    res.json({
        mesa
    });
}

const mesasPost = async (req = request, res = response)=>{
    
    const { numero, qr, estado } = req.body;
    console.log(req.numero)
    console.log(req.qr)
    console.log(req.estado)
    const mesa = new Mesa({numero, qr, estado});
    await mesa.save()

    res.json({
        msg:"Nueva Tasty mesa se ha creado",
        mesa
    });
}

const mesasPut = async (req = request, res = response)=>{
    const id = req.params.id;
    const {_id, ...resto} = req.body;
    const mesa = await Mesa.findByIdAndUpdate(id, resto, {estado: false},{new: true})
    
    res.json({
        msg:"Tasty mesa modificada coorectamente",
        mesa,
    });
}

const mesasDelete = async (req = request, res = response)=>{
    const id = req.params.id;
    const mesa = await Mesa.findByIdAndDelete(id);
    
    res.json({
        msg:"Una tasty mesa se ha eliminado",
        mesa
    });
}

module.exports={
    mesasGet,
    mesasPost,
    mesasPut,
    mesasDelete
};