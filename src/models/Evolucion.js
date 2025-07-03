const mongoose = require('mongoose');

const evolucionSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  notas: {
    type: String,
    required: true,
  },
  constantes: {
    temperatura: Number,
    pulso: Number,
    tension: String,
  },
  intervenciones: [String], // Lista de intervenciones de enfermería
});

const Evolucion = mongoose.model('Evolucion', evolucionSchema);
module.exports = Evolucion;
