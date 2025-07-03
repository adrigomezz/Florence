// src/pages/Patients.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Pencil, Trash2, FileText, Download } from 'lucide-react';
import './patients.css';

function Pacientes() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    direccion: '',
    sexo: '',
    fechaNacimiento: ''
  });
  const [editId, setEditId] = useState(null);

  const loadPatients = () => {
    axios
      .get('http://localhost:3000/api/pacientes')
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener pacientes:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { nombre, dni, telefono, direccion, sexo, fechaNacimiento } = form;

    if (!nombre || !dni || !telefono || !direccion || !sexo || !fechaNacimiento) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const request = editId
      ? axios.put(`http://localhost:3000/api/pacientes/${editId}`, form)
      : axios.post('http://localhost:3000/api/pacientes', form);

    request
      .then(() => {
        loadPatients();
        setForm({ nombre: '', dni: '', telefono: '', direccion: '', sexo: '', fechaNacimiento: '' });
        setEditId(null);
      })
      .catch(err => {
        console.error('Error al guardar paciente:', err);
        alert('Hubo un error al guardar el paciente.');
      });
  };

  const handleEdit = paciente => {
    setForm({
      nombre: paciente.nombre,
      dni: paciente.dni,
      telefono: paciente.telefono,
      direccion: paciente.direccion,
      sexo: paciente.sexo,
      fechaNacimiento: paciente.fechaNacimiento?.split('T')[0] || ''
    });
    setEditId(paciente._id);
  };

  const handleDelete = id => {
    if (confirm('¿Seguro que quieres eliminar este paciente?')) {
      axios.delete(`http://localhost:3000/api/pacientes/${id}`).then(() => loadPatients());
    }
  };

  const exportPDF = paciente => {
    const doc = new jsPDF();
    doc.text('Datos del Paciente', 10, 10);
    doc.text(`Nombre: ${paciente.nombre}`, 10, 20);
    doc.text(`DNI: ${paciente.dni}`, 10, 30);
    doc.text(`Teléfono: ${paciente.telefono}`, 10, 40);
    doc.text(`Dirección: ${paciente.direccion}`, 10, 50);
    doc.text(`Sexo: ${paciente.sexo}`, 10, 60);
    doc.text(`Fecha de Nacimiento: ${new Date(paciente.fechaNacimiento).toLocaleDateString()}`, 10, 70);
    doc.save(`Paciente_${paciente.dni}.pdf`);
  };

  return (
    <div className="patients-container">
      <h1 className="patients-title">🩺 Listado de Pacientes</h1>
      <p className="patients-subtitle">Consulta, añade, edita, elimina y exporta pacientes.</p>

      <form className="patients-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          className="input"
          maxLength={50}
          required
        />
        <input
          type="text"
          placeholder="DNI (ej: 12345678Z)"
          value={form.dni}
          onChange={e => setForm({ ...form, dni: e.target.value })}
          pattern="^[0-9]{8}[A-Za-z]$"
          className="input"
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })}
          pattern="[0-9]{9}"
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={form.direccion}
          onChange={e => setForm({ ...form, direccion: e.target.value })}
          className="input"
          required
        />
        <select
          value={form.sexo}
          onChange={e => setForm({ ...form, sexo: e.target.value })}
          className="input"
          required
        >
          <option value="">Selecciona sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          type="date"
          value={form.fechaNacimiento}
          onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
          className="input"
          required
        />
        <button type="submit" className="btn-submit">
          {editId ? 'Actualizar paciente' : 'Añadir paciente'}
        </button>
      </form>

      {loading ? (
        <div className="patients-placeholder">Cargando pacientes...</div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Sexo</th>
                <th>Fecha de Nacimiento</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.dni}</td>
                  <td>{p.telefono}</td>
                  <td>{p.direccion}</td>
                  <td>{p.sexo}</td>
                  <td>{new Date(p.fechaNacimiento).toLocaleDateString()}</td>
                  <td className="text-center space-x-2">
                    <button className="action-icon edit" onClick={() => handleEdit(p)}><Pencil size={16} /></button>
                    <button className="action-icon delete" onClick={() => handleDelete(p._id)}><Trash2 size={16} /></button>
                    <button className="action-icon pdf" onClick={() => exportPDF(p)}><FileText size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Pacientes;
