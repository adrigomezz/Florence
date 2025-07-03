const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
  },
  responsable: {
    nombre: String,
    telefono: String,
  },
  historial: {
    type: String,
    default: '',
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
