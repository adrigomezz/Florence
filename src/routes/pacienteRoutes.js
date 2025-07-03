const express = require('express');
const router = express.Router();
const {
  crearPaciente,
  obtenerPacientes,
  actualizarPaciente,
  eliminarPaciente
} = require('../controllers/pacienteController');

// Crear nuevo paciente
router.post('/', crearPaciente);

// Obtener todos los pacientes
router.get('/', obtenerPacientes);

// Actualizar paciente por ID
router.put('/:id', actualizarPaciente);

// Eliminar paciente por ID
router.delete('/:id', eliminarPaciente);

module.exports = router;
