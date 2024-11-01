const express = require('express');
const cors = require('cors');
const app = express();
const clientesRouter = require('./routes/clientes');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(cors()); // Para permitir que el frontend haga solicitudes al backend

// Usar las rutas de clientes
app.use('/clientes', clientesRouter);

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
