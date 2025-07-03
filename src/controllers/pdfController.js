const PDFDocument = require('pdfkit');
const Evolucion = require('../models/Evolucion');
const Paciente = require('../models/Paciente');

const generarPDF = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    const paciente = await Paciente.findById(pacienteId);
    const evoluciones = await Evolucion.find({ paciente: pacienteId }).sort({ fecha: -1 });

    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="Informe_${paciente.nombre.replace(/\s+/g, '_')}.pdf"`
    );

    doc.pipe(res);

    // Cabecera
    doc.font('Helvetica-Bold').fontSize(20).text('Informe Clínico - Florence', {
      align: 'center',
    });
    doc.moveDown();

    // Datos del paciente
    doc.fontSize(14).font('Helvetica-Bold').text('Datos del paciente', { underline: true });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12).text(`Nombre completo: ${paciente.nombre}`, { align: 'justify' });
    doc.text(`DNI: ${paciente.dni}`, { align: 'justify' });
    doc.text(`Fecha de nacimiento: ${new Date(paciente.fechaNacimiento).toLocaleDateString()}`, { align: 'justify' });
    doc.text(`Sexo: ${paciente.sexo}`, { align: 'justify' });
    doc.text(`Dirección: ${paciente.direccion}`, { align: 'justify' });
    doc.text(`Teléfono: ${paciente.telefono}`, { align: 'justify' });
    doc.text(`Correo electrónico: ${paciente.correo}`, { align: 'justify' });
    doc.text(`Responsable: ${paciente.responsable.nombre} (${paciente.responsable.telefono})`, { align: 'justify' });
    doc.text(`Historial médico: ${paciente.historial}`, { align: 'justify' });
    doc.moveDown();

    // Evoluciones clínicas
    doc.font('Helvetica-Bold').fontSize(14).text('Evoluciones clínicas', { underline: true });
    doc.moveDown(0.5);

    evoluciones.forEach((evo, index) => {
      doc.font('Helvetica-Bold').fontSize(13).text(`Evolución #${index + 1}`, { align: 'left' });
      doc.font('Helvetica').fontSize(12).text(`Fecha: ${new Date(evo.fecha).toLocaleDateString()}`, { align: 'justify' });
      doc.text(`Notas: ${evo.notas}`, { align: 'justify' });

      doc.text('Constantes:', { align: 'left' });
      doc.text(`  • Temperatura: ${evo.constantes.temperatura} °C`, { align: 'justify' });
      doc.text(`  • Pulso: ${evo.constantes.pulso}`, { align: 'justify' });
      doc.text(`  • Tensión: ${evo.constantes.tension}`, { align: 'justify' });

      doc.text(`Intervenciones: ${evo.intervenciones.join(', ')}`, { align: 'justify' });
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ mensaje: 'Error al generar el PDF clínico' });
  }
};

module.exports = { generarPDF };
