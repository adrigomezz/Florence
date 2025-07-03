// src/pages/Evolutions.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Pencil, Trash2, FileText } from "lucide-react";
import './register.css';

function Evolutions() {
  const [patients, setPatients] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [form, setForm] = useState({
    paciente: "",
    notas: "",
    temperatura: "",
    pulso: "",
    tension: "",
    intervenciones: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/pacientes").then(res => setPatients(res.data));
  }, []);

  useEffect(() => {
    if (form.paciente) loadEvolutions();
  }, [form.paciente]);

  const loadEvolutions = () => {
    axios.get(`http://localhost:3000/api/evoluciones/${form.paciente}`)
      .then(res => {
        setEvolutions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar evoluciones:", err);
        setLoading(false);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { paciente, notas, temperatura, pulso, tension, intervenciones } = form;
    if (!paciente || !notas || !temperatura || !pulso || !tension || !intervenciones) {
      alert("Completa todos los campos");
      return;
    }

    const payload = {
      paciente,
      notas,
      constantes: { temperatura, pulso, tension },
      intervenciones
    };

    const req = editId
      ? axios.put(`http://localhost:3000/api/evoluciones/${editId}`, payload)
      : axios.post("http://localhost:3000/api/evoluciones", payload);

    req.then(() => {
      loadEvolutions();
      setForm({
        paciente: "",
        notas: "",
        temperatura: "",
        pulso: "",
        tension: "",
        intervenciones: ""
      });
      setEditId(null);
    });
  };

  const handleEdit = evo => {
    setForm({
      paciente: evo.paciente,
      notas: evo.notas,
      temperatura: evo.constantes?.temperatura || "",
      pulso: evo.constantes?.pulso || "",
      tension: evo.constantes?.tension || "",
      intervenciones: evo.intervenciones
    });
    setEditId(evo._id);
  };

  const handleDelete = id => {
    if (confirm("¿Eliminar esta evolución?")) {
      axios.delete(`http://localhost:3000/api/evoluciones/${id}`).then(() => loadEvolutions());
    }
  };

  const exportPDF = evo => {
    const doc = new jsPDF();
    doc.text("Evolución Clínica", 10, 10);
    doc.text(`Notas: ${evo.notas}`, 10, 20);
    doc.text(`Constantes: Temp ${evo.constantes?.temperatura}, Pulso ${evo.constantes?.pulso}, Tensión ${evo.constantes?.tension}`, 10, 30);
    doc.text(`Intervenciones: ${evo.intervenciones}`, 10, 40);
    doc.text(`Fecha: ${new Date(evo.fecha).toLocaleDateString()}`, 10, 50);
    doc.save(`Evolucion_${evo._id}.pdf`);
  };

  return (
    <div className="evolutions-container">
      <h1 className="evolutions-title">📋 Evoluciones Clínicas</h1>
      <p className="evolutions-subtitle">Registra, edita, elimina y exporta evoluciones de pacientes.</p>

      <form className="evolutions-form" onSubmit={handleSubmit}>
        <select className="input" value={form.paciente} onChange={e => setForm({ ...form, paciente: e.target.value })}>
          <option value="">Selecciona un paciente</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <textarea
          placeholder="Notas"
          className="input"
          value={form.notas}
          onChange={e => setForm({ ...form, notas: e.target.value })}
        ></textarea>

        <select className="input" value={form.temperatura} onChange={e => setForm({ ...form, temperatura: e.target.value })}>
          <option value="">Temperatura (°C)</option>
          <option value="36">36</option>
          <option value="37.5">37.5</option>
          <option value="38">38</option>
          <option value="38.5">38.5</option>
          <option value="39">39</option>
        </select>

        <select className="input" value={form.pulso} onChange={e => setForm({ ...form, pulso: e.target.value })}>
          <option value="">Pulso (lpm)</option>
          <option value="50">50</option>
          <option value="70">70</option>
          <option value="90">90</option>
          <option value="110">110</option>
          <option value="130">130</option>
        </select>

        <select className="input" value={form.tension} onChange={e => setForm({ ...form, tension: e.target.value })}>
          <option value="">Tensión arterial</option>
          <option value="120/80">120/80</option>
          <option value="140/90">140/90</option>
          <option value="90/60">90/60</option>
          <option value="160/100">160/100</option>
        </select>

        <textarea
          placeholder="Intervenciones"
          className="input"
          value={form.intervenciones}
          onChange={e => setForm({ ...form, intervenciones: e.target.value })}
        ></textarea>

        <button type="submit" className="btn-submit">
          {editId ? "Actualizar evolución" : "Registrar evolución"}
        </button>
      </form>

      {loading ? (
        <div className="evolutions-placeholder">Cargando evoluciones...</div>
      ) : (
        <table className="evolutions-table">
          <thead>
            <tr>
              <th>Notas</th>
              <th>Constantes</th>
              <th>Intervenciones</th>
              <th>Fecha</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evolutions.map(e => (
              <tr key={e._id}>
                <td>{e.notas}</td>
                <td>
                  Temp: {e.constantes?.temperatura}°C<br />
                  Pulso: {e.constantes?.pulso} lpm<br />
                  TA: {e.constantes?.tension}
                </td>
                <td>{e.intervenciones}</td>
                <td>{new Date(e.fecha).toLocaleDateString()}</td>
                <td className="text-center space-x-2">
                  <button className="action edit" onClick={() => handleEdit(e)}><Pencil size={16} /></button>
                  <button className="action delete" onClick={() => handleDelete(e._id)}><Trash2 size={16} /></button>
                  <button className="action pdf" onClick={() => exportPDF(e)}><FileText size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Evolutions;
