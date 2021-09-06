const mongoose = require('mongoose')

const dbConnection= async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log("Tasty DB on fire papalú")
    }catch(error){
        console.log(error)
        throw new Error("No estariamos conectando con la Tasty DB cumpa")
    }
}

module.exports={
    dbConnection
}