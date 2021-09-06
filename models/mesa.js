const {Schema, model} = require('mongoose')

const MesaSchema= new Schema({

    numero:{
        type: Number,
        require:[true, "El numero es obligatorio"],
        unique:true
    },
    qr:{
        type: String
    },
    estado:{
        type:Boolean,
        default:true
    },
})

module.exports=model("Mesa", MesaSchema)