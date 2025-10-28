let myslq = require("mysql");
let conexion = myslq.createConnection({
    host:"localhost",datebase:"tda_actividades",user:"root",password:""
});
conexion.connect(function(err){
    if (err){
        throw err;
    }
    else{
        console.log("conexion exitosa");
    }
});