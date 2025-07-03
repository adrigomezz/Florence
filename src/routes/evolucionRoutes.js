const express = require('express');
const router = express.Router();

const {
  crearEvolucion,
  obtenerEvolucionesPorPaciente,
  obtenerTodasEvoluciones, // este es clave
  editarEvolucion,
  eliminarEvolucion
} = require('../controllers/evolucionController');

// Crear nueva evolución clínica
router.post('/', crearEvolucion);

// ✅ Obtener todas las evoluciones
router.get('/', obtenerTodasEvoluciones);

// Obtener evoluciones por paciente con o sin rango
router.get('/:pacienteId', obtenerEvolucionesPorPaciente);

// Editar evolución
router.put('/:id', editarEvolucion);

// Eliminar evolución
router.delete('/:id', eliminarEvolucion);

module.exports = router;
