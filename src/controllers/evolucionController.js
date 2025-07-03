const Evolucion = require('../models/Evolucion');
const Paciente = require('../models/Paciente');

// POST /api/evoluciones
const crearEvolucion = async (req, res) => {
  try {
    const { paciente, notas, constantes, intervenciones } = req.body;

    const pacienteExiste = await Paciente.findById(paciente);
    if (!pacienteExiste) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    const nuevaEvolucion = new Evolucion({ paciente, notas, constantes, intervenciones });
    const evolucionGuardada = await nuevaEvolucion.save();
    res.status(201).json(evolucionGuardada);
  } catch (error) {
    console.error('Error al crear evolución clínica:', error);
    res.status(500).json({ mensaje: 'Error al registrar la evolución' });
  }
};

// GET /api/evoluciones/:pacienteId?desde=...&hasta=...
const obtenerEvolucionesPorPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const { desde, hasta } = req.query;

    let filtro = { paciente: pacienteId };
    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }

    const evoluciones = await Evolucion.find(filtro)
      .populate('paciente', 'nombre') // Solo el campo 'nombre' del paciente
      .sort({ fecha: -1 });

    if (!evoluciones || evoluciones.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron evoluciones para este paciente en ese rango' });
    }

    res.status(200).json(evoluciones);
  } catch (error) {
    console.error('Error al obtener evoluciones:', error);
    res.status(500).json({ mensaje: 'Error al obtener las evoluciones clínicas' });
  }
};

// ✅ GET /api/evoluciones (todas)
const obtenerTodasEvoluciones = async (req, res) => {
  try {
    const evoluciones = await Evolucion.find()
      .populate('paciente', 'nombre') // Solo el campo 'nombre' del paciente
      .sort({ fecha: -1 });

    res.status(200).json(evoluciones);
  } catch (error) {
    console.error('Error al obtener evoluciones:', error);
    res.status(500).json({ mensaje: 'Error al obtener evoluciones' });
  }
};

// PUT /api/evoluciones/:id
const editarEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const evolucionActualizada = await Evolucion.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!evolucionActualizada) {
      return res.status(404).json({ mensaje: 'Evolución no encontrada' });
    }

    res.status(200).json(evolucionActualizada);
  } catch (error) {
    console.error('Error al editar evolución:', error);
    res.status(500).json({ mensaje: 'Error al editar la evolución clínica' });
  }
};

// DELETE /api/evoluciones/:id
const eliminarEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const evolucionEliminada = await Evolucion.findByIdAndDelete(id);

    if (!evolucionEliminada) {
      return res.status(404).json({ mensaje: 'Evolución no encontrada' });
    }

    res.status(200).json({ mensaje: 'Evolución eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar evolución:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la evolución clínica' });
  }
};

module.exports = {
  crearEvolucion,
  obtenerEvolucionesPorPaciente,
  obtenerTodasEvoluciones,
  editarEvolucion,
  eliminarEvolucion
};
