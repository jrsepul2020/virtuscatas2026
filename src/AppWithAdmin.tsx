import { useState } from 'react';
import { Login } from './components/Login';
import { TabletManager } from './components/TabletManager';
import { useDeviceAuth } from './hooks/useDeviceAuth';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuth();
  const [showApp, setShowApp] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin'>('dashboard');

  // Si no hay usuario logueado o no se ha mostrado la app, mostrar login
  if (!user || !showApp) {
    return <Login onLoginSuccess={() => setShowApp(true)} />;
  }

  // Verificar si el usuario es administrador (por ejemplo, por email)
  const isAdmin = user.email === 'admin@virtuscatas.com';

  // Aplicación principal para catadores logueados
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Virtus Catas 2026</h1>
          
          {/* Navigation */}
          <nav className="nav-buttons">
            <button 
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            {isAdmin && (
              <button 
                className={`nav-btn ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => setCurrentView('admin')}
              >
                Gestión Tablets
              </button>
            )}
          </nav>

          <div className="user-info">
            <span>Bienvenido, {user.nombre || user.email}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' ? (
          <div className="dashboard">
            <h2>Panel de Catador</h2>
            <div className="dashboard-card">
              <h3>Información del Usuario</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tablet:</strong> {user.ntablet?.substring(0, 20)}...</p>
              {isAdmin && (
                <p><strong>Rol:</strong> Administrador</p>
              )}
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

            {isAdmin && (
              <div className="dashboard-card admin-info">
                <h3>Panel de Administración</h3>
                <p>Como administrador, puedes acceder al panel de gestión de tablets usando el botón "Gestión Tablets" en la navegación.</p>
              </div>
            )}
          </div>
        ) : (
          <TabletManager />
        )}
      </main>
    </div>
  );
}

export default App;