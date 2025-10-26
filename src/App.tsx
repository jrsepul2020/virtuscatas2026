import { useState } from 'react';
import { Login } from './components/Login';
import { useDeviceAuth } from './hooks/useDeviceAuth';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuth();
  const [showApp, setShowApp] = useState(false);

  // Si no hay usuario logueado o no se ha mostrado la app, mostrar login
  if (!user || !showApp) {
    return <Login onLoginSuccess={() => setShowApp(true)} />;
  }

  // Aplicación principal para catadores logueados
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Virtus Catas 2026</h1>
          <div className="user-info">
            <span>Bienvenido, {user.nombre || user.email}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard">
          <h2>Panel de Catador</h2>
          <div className="dashboard-card">
            <h3>Información del Usuario</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tablet:</strong> {user.ntablet?.substring(0, 20)}...</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Próximas Funcionalidades</h3>
            <ul>
              <li>Lista de catas asignadas</li>
              <li>Formularios de evaluación</li>
              <li>Historial de catas</li>
              <li>Resultados y estadísticas</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
