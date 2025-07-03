// src/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import logoFlorence from '/logo-florence.png';
import './index.css';

function Layout() {
  const location = useLocation();

  return (
    <div className="bg-neutral min-h-screen flex flex-col items-center justify-start px-4 py-10">
      {/* Logo visible solo en la Home */}
      {location.pathname === '/' && (
        <img
          src={logoFlorence}
          alt="Florence"
          className="mx-auto h-24 mb-6 drop-shadow-md transition-all duration-300 ease-in-out animate-logo-entry"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}

      {/* Contenedor principal con animación */}
      <div className="w-full max-w-2xl animate-fade-in-up">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
