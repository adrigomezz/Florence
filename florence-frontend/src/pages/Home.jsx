// src/pages/Home.jsx
function Home() {
  return (
    <div className="bg-white shadow-deep rounded-3xl p-10 w-full text-center">
      <p className="text-muted text-base mb-8">
        Bienvenido a Florence, el sistema clínico de gestión de pacientes a domicilio. Selecciona una opción para comenzar.
      </p>

      <div className="space-y-4">
        <a
          href="/pacientes"
          className="block w-full py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-blue-900 transition shadow-soft"
        >
          Pacientes
        </a>
        <a
          href="/registrar"
          className="block w-full py-3 rounded-2xl bg-secondary text-white font-semibold hover:bg-cyan-700 transition shadow-soft"
        >
          Evoluciones
        </a>
        <a
          href="/estadisticas"
          className="block w-full py-3 rounded-2xl bg-dark text-white font-semibold hover:bg-gray-800 transition shadow-soft"
        >
          Estadísticas
        </a>
      </div>
    </div>
  );
}

export default Home;
