const express = require('express'); // Importamos Express
const cors = require('cors'); // Permitimos peticiones desde otros dominios
require('dotenv').config(); // Cargamos variables desde el archivo .env

const connectDB = require('./config/db');
connectDB();

const app = express(); // Creamos la instancia del servidor

// Middlewares
app.use(cors()); // Permite CORS
app.use(express.json()); // Permite recibir JSON en peticiones

// Ruta simple de funcionamiento
app.get('/', (req, res) => {
  res.send('Florence API funcionando 🩺');
});

const PORT = process.env.PORT || 3000; // Puerto desde el archivo .env o por defecto en el 3000

// Rutas
const pacienteRoutes = require('./routes/pacienteRoutes');
app.use('/api/pacientes', pacienteRoutes);

const evolucionRoutes = require('./routes/evolucionRoutes');
app.use('/api/evoluciones', evolucionRoutes);

const pdfRoutes = require('./routes/pdfRoutes');
app.use('/api/pdf', pdfRoutes);

const estadisticasRoutes = require('./routes/estadisticasRoutes');
app.use('/api/estadisticas', estadisticasRoutes);

const iaRoutes = require('./routes/iaRoutes');
app.use('/api/ia', iaRoutes);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
