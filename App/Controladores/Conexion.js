let myslq = require("mysql2");
const conexion = myslq.createConnection({
    host:"localhost",datebase:"tda_actividades",user:"root",password:""
});

export {myslq};
export async function GetCon() {
    try {
        return await myslq.Conexion(conexion);
    } catch (error) {
        console.error(error);
    }
}