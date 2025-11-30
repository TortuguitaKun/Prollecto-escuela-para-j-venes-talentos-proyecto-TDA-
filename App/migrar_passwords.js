// migrar_passwords.js
// Script temporal para hashear las contraseñas existentes en texto plano.

// RUTA CORREGIDA: Ahora usa './Conexion.js' porque el script está en la misma carpeta 'App/'
import { pool } from './Conexion.js'; 
import bcrypt from 'bcrypt';
const saltRounds = 10; // Factor de seguridad recomendado para bcrypt

async function hashAndMigratePasswords() {
    let connection;
    try {
        console.log("Iniciando la migración de contraseñas a hashes seguros...");
        
        // 1. Obtener una conexión del pool
        connection = await pool.getConnection();

        // 2. Obtener todos los usuarios.
        // Asumimos que la columna de contraseña se llama 'password' en tu tabla.
        const [users] = await connection.execute('SELECT id_usuario, password FROM usuarios');

        if (users.length === 0) {
            console.log("No se encontraron usuarios para migrar. Finalizando.");
            return;
        }

        console.log(`Encontrados ${users.length} usuarios para actualizar.`);

        // 3. Iterar sobre cada usuario, hashear y actualizar la base de datos
        for (const user of users) {
            const userId = user.id_usuario;
            const plainPassword = user.password;

            // Verificar si la contraseña ya es un hash de bcrypt (evita hashear un hash)
            if (plainPassword.length > 50 && plainPassword.startsWith('$2b$')) {
                console.log(`Usuario ID ${userId}: La contraseña ya parece hasheada. Saltando.`);
                continue;
            }

            // Generar el hash seguro
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

            // 4. Actualizar la tabla 'usuarios' con el nuevo hash
            await connection.execute(
                'UPDATE usuarios SET password = ? WHERE id_usuario = ?',
                [hashedPassword, userId]
            );
            console.log(`✅ Contraseña del usuario ID ${userId} hasheada y actualizada.`);
        }

        console.log("\n*** 🥳 Migración de contraseñas completada con éxito. ***");

    } catch (error) {
        console.error("❌ ERROR CRÍTICO durante la migración. Asegúrese de que la DB esté corriendo y las credenciales del .env sean correctas:", error);
    } finally {
        // 5. Liberar la conexión
        if (connection) connection.release();
    }
}

// Ejecutar el proceso
hashAndMigratePasswords();