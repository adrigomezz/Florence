import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BarChart2, FileText, Sparkles, Trash2 } from 'lucide-react';
import './statistics.css';

function Statistics() {
  const [evolutions, setEvolutions] = useState([]);
  const [selectedEvolutionId, setSelectedEvolutionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [iaRecommendations, setIaRecommendations] = useState([]);

  useEffect(() => {
    fetchEvolutions();
  }, []);

  const fetchEvolutions = () => {
    axios
      .get('http://localhost:3000/api/evoluciones')
      .then((res) => {
        setEvolutions(res.data);
        setLoading(false);
        setIaRecommendations([]);
        setSelectedEvolutionId('');
      })
      .catch((err) => {
        console.error('Error al obtener estadísticas:', err);
        setEvolutions([]);
        setLoading(false);
        setIaRecommendations([]);
      });
  };

  const handleEvolutionSelection = (e) => {
    const id = e.target.value;
    setSelectedEvolutionId(id);
    setIaRecommendations([]);

    const selectedEvo = evolutions.find((evo) => evo._id === id);
    if (!selectedEvo) return;

    axios
      .post('http://localhost:3000/api/ia/recomendar', {
        temperatura: selectedEvo.constantes?.temperatura,
        pulso: selectedEvo.constantes?.pulso,
        tension: selectedEvo.constantes?.tension,
        notas: selectedEvo.notas
      })
      .then((res) => {
        setIaRecommendations(res.data.recomendaciones || []);
      })
      .catch((err) => {
        console.error('Error IA:', err);
        setIaRecommendations([]);
      });
  };

  const handleDeleteEvolution = () => {
    if (!selectedEvolutionId) return alert('Selecciona una evolución primero.');

    const confirm = window.confirm('¿Estás seguro de eliminar esta evolución? Esta acción no se puede deshacer.');
    if (!confirm) return;

    axios
      .delete(`http://localhost:3000/api/evoluciones/${selectedEvolutionId}`)
      .then(() => {
        alert('Evolución eliminada con éxito.');
        fetchEvolutions();
      })
      .catch((err) => {
        console.error('Error al eliminar evolución:', err);
        alert('Error al eliminar evolución.');
      });
  };

  const exportDetailedPDF = () => {
    const selectedEvo = evolutions.find((evo) => evo._id === selectedEvolutionId);
    if (!selectedEvo) return alert('Selecciona una evolución primero.');

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Informe Clinico Completo', 14, 20);

    doc.setFontSize(12);
    doc.text(`ID de la evolucion: ${selectedEvo._id}`, 14, 30);
    doc.text(`Fecha: ${new Date(selectedEvo.fecha).toLocaleString()}`, 14, 40);
    doc.text(`ID del paciente: ${selectedEvo.paciente?._id || 'N/A'}`, 14, 50);
    doc.text(`Nombre del paciente: ${selectedEvo.paciente?.nombre || 'Nombre no disponible'}`, 14, 60);
    doc.text('Notas:', 14, 70);
    doc.text(selectedEvo.notas || 'Sin notas registradas.', 14, 78, { maxWidth: 180 });

    autoTable(doc, {
      startY: 88,
      head: [['Temperatura (°C)', 'Pulso (bpm)', 'Tensión (mmHg)']],
      body: [
        [
          selectedEvo.constantes?.temperatura || 'N/A',
          selectedEvo.constantes?.pulso || 'N/A',
          selectedEvo.constantes?.tension || 'N/A'
        ]
      ]
    });

    if (iaRecommendations.length > 0) {
      doc.text('Recomendaciones IA:', 14, doc.lastAutoTable.finalY + 10);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 16,
        head: [['Recomendación']],
        body: iaRecommendations.map((rec) => [rec])
      });
    }

    doc.save('informe_clinico_completo.pdf');
  };

  const pacientesUnicos = new Set(evolutions.map((evo) => evo.paciente?._id)).size;

  return (
    <div className="statistics-container">
      <h1 className="statistics-title">Estadísticas Clínicas</h1>
      <p className="statistics-subtitle">
        Consulta el resumen de actividad clínica y genera recomendaciones automáticas.
      </p>

      {loading ? (
        <div className="statistics-placeholder">Cargando estadísticas...</div>
      ) : (
        <>
          <div className="statistics-summary">
            <div className="summary-card">
              <BarChart2 className="summary-icon text-primary" size={32} />
              <p className="summary-value">{evolutions.length}</p>
              <p className="summary-label">Evoluciones</p>
            </div>
            <div className="summary-card">
              <BarChart2 className="summary-icon text-accent" size={32} />
              <p className="summary-value">{pacientesUnicos}</p>
              <p className="summary-label">Pacientes únicos</p>
            </div>
            <button className="btn-export" onClick={exportDetailedPDF}>
              <FileText size={16} className="mr-2" /> Exportar PDF completo
            </button>
          </div>

          <div className="evolution-selector">
            <label className="statistics-label">Selecciona una evolución</label>
            <select
              className="statistics-input"
              value={selectedEvolutionId}
              onChange={handleEvolutionSelection}
            >
              <option value="">-- Selecciona una evolución --</option>
              {evolutions.map((evo) => (
                <option key={evo._id} value={evo._id}>
                  {new Date(evo.fecha).toLocaleDateString()} - {evo.paciente?.nombre || evo.paciente?._id}
                </option>
              ))}
            </select>
            <button className="btn-delete" onClick={handleDeleteEvolution}>
              <Trash2 size={16} className="mr-2" /> Eliminar evolución seleccionada
            </button>
          </div>

          <div className="ai-box mt-6">
            <Sparkles size={28} className="text-yellow-500 mb-2" />
            <h3 className="ai-title">Simulación IA Clínica</h3>
            {iaRecommendations.length > 0 ? (
              <ul className="ai-text list-disc text-left mt-2">
                {iaRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p className="ai-text">
                Selecciona una evolución para obtener recomendaciones personalizadas.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;
