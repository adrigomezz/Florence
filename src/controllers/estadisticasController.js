const Evolucion = require('../models/Evolucion');

// GET /api/estadisticas/:pacienteId
const obtenerEstadisticas = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    const evoluciones = await Evolucion.find({ paciente: pacienteId });

    if (!evoluciones.length) {
      return res.status(404).json({ mensaje: 'No hay evoluciones clínicas para este paciente' });
    }

    // Calcular estadísticas
    const totalEvoluciones = evoluciones.length;
    const temperaturas = evoluciones.map(e => e.constantes.temperatura).filter(Boolean);
    const pulsos = evoluciones.map(e => e.constantes.pulso).filter(Boolean);

    const temperaturaMedia = temperaturas.reduce((a, b) => a + b, 0) / temperaturas.length;
    const pulsoMedio = pulsos.reduce((a, b) => a + b, 0) / pulsos.length;

    const intervenciones = evoluciones.flatMap(e => e.intervenciones || []);
    const intervencionesContadas = intervenciones.reduce((acc, nombre) => {
      acc[nombre] = (acc[nombre] || 0) + 1;
      return acc;
    }, {});
    const intervencionFrecuente = Object.entries(intervencionesContadas)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Ninguna';

    const fechas = evoluciones.map(e => new Date(e.fecha));
    const fechaPrimera = new Date(Math.min(...fechas));
    const fechaUltima = new Date(Math.max(...fechas));

    res.status(200).json({
      totalEvoluciones,
      temperaturaMedia: temperaturaMedia.toFixed(1),
      pulsoMedio: pulsoMedio.toFixed(1),
      intervencionMasFrecuente: intervencionFrecuente,
      fechaPrimera,
      fechaUltima
    });

  } catch (error) {
    console.error('Error al obtener estadísticas clínicas:', error);
    res.status(500).json({ mensaje: 'Error al obtener estadísticas clínicas del paciente' });
  }
};

module.exports = { obtenerEstadisticas };
