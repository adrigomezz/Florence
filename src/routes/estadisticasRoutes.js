const express = require('express');
const router = express.Router();
const { obtenerEstadisticas } = require('../controllers/estadisticasController');

// Ruta para obtener estadísticas clínicas de un paciente
router.get('/:pacienteId', obtenerEstadisticas);

module.exports = router;
