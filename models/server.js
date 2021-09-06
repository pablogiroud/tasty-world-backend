const express = require('express')
const cors = require('cors')
//importar conexion a DB
const {dbConnection}=require ("../database/config")

class Server{
    constructor(){
        //inicialicen cuando se levante el server
        this.app=express();
        this.usuariosPath="/api/usuarios";
        this.menuesPath="/api/menues";
        
        //conexion a la DB
        this.conectarDB();

        //middlewares
        this.middleware();

        //rutas
        this.usuariosRoutes();
        this.menuesRoutes();
    }

    //funcion conectar a la DB
    async conectarDB(){
        await dbConnection()
    }

    middleware(){
        //carpeta publica
        this.app.use(express.static('public'));

        //cors
        this.app.use(cors());

        //acceso al body leer y parsear
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
    }

    usuariosRoutes(){
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
        
    }
    
    menuesRoutes(){
        this.app.use(this.menuesPath, require("../routes/menues"));
    }

    listen(){
    this.app.listen(process.env.PORT, () => {
        console.log("Servidor online puerto", process.env.PORT)
    });
    }


}

module.exports=Server