const mysql = require('mysql2');

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Asegúrate de que este sea tu usuario MySQL correcto
    password: 'pelusin1234', // Si no tienes contraseña, deja esto vacío ('')
    database: 'soderia' // Cambia por el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
