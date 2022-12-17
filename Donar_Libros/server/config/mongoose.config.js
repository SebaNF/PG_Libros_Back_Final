const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/nose' , {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
    .then(()=>console.log("CONEXION CON BASE DE DATOS ESTABLECIDA"))
    .catch(err=> console.log("PROBLEMAS CON CONECTARSE A LA BASE DE DATOS ",err))