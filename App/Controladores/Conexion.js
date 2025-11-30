<<<<<<< HEAD
// App/Conexion.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; 

// Carga las variables del archivo .env
dotenv.config();

// Configuración de la conexión
const config = {

    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "tda_actividades",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    

    waitForConnections: true, // Esperar si todas las conexiones están en uso
    connectionLimit: 10,       // Máximo de conexiones concurrentes
    queueLimit: 0              // No limitar la cola de espera
};
const pool = mysql.createPool(config);

export { pool };

export async function verificarConexion() {
    try {
        const connection = await pool.getConnection(); // Intenta obtener una conexión
        connection.release(); // La libera inmediatamente
        console.log("✅ Conexión al Pool de MySQL establecida correctamente.");
    } catch (error) {
        console.error("❌ ERROR CRÍTICO al conectar a la base de datos:", error.message);
        // Terminar el proceso si la conexión a la DB falla
        process.exit(1);
=======
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
>>>>>>> origin/MegaZero08/Lapislazuli
    }
}