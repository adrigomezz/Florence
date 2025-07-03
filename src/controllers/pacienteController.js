const Paciente = require('../models/Paciente');

// POST /api/pacientes
const crearPaciente = async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    const pacienteGuardado = await nuevoPaciente.save();
    res.status(201).json(pacienteGuardado);
  } catch (error) {
    console.error('Error al crear paciente:', error);

    if (error.code === 11000 && error.keyPattern?.dni) {
      return res.status(400).json({ mensaje: 'El DNI ya está registrado en el sistema.' });
    }

    res.status(500).json({ mensaje: 'Error al registrar el paciente' });
  }
};

// GET /api/pacientes
const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find().sort({ creadoEn: -1 });
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ mensaje: 'Error al obtener pacientes' });
  }
};

// PUT /api/pacientes/:id
const actualizarPaciente = async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pacienteActualizado) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.status(200).json(pacienteActualizado);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ mensaje: 'Error al actualizar los datos del paciente' });
  }
};

// DELETE /api/pacientes/:id
const eliminarPaciente = async (req, res) => {
  try {
    const pacienteEliminado = await Paciente.findByIdAndDelete(req.params.id);

    if (!pacienteEliminado) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el paciente' });
  }
};

module.exports = {
  crearPaciente,
  obtenerPacientes,
  actualizarPaciente,
  eliminarPaciente
};
