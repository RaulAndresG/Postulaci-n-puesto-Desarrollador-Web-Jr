require('dotenv').config();

const express = require('express');
const conectarMdb = require('./Backend/config/database.js');
const authRoutes = require('./Backend/src/routes/authRoutes.js');
const cors = require('cors');

const app = express();

conectarMdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Rutas de autenticación
app.use('/SoliAut', authRoutes);

// Manejador de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

// Manejador de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

const PORT = process.env.PORT || 7777;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
