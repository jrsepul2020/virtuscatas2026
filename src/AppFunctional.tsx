import { useState } from 'react';
import { Login } from './components/Login';
import { useDeviceAuthAdapted } from './hooks/useDeviceAuthAdapted';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuthAdapted();
  const [showApp, setShowApp] = useState(false);

  // Si no hay usuario logueado o no se ha mostrado la app, mostrar login
  if (!user || !showApp) {
    return <Login onLoginSuccess={() => setShowApp(true)} />;
  }

  // Verificar si el usuario es administrador
  const isAdmin = user.rol === 'admin';

  // Aplicación principal para catadores logueados
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Virtus Catas 2026</h1>

          <div className="user-info">
            <span>Bienvenido, {user.nombre}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard">
          <h2>¡Sistema Funcionando! 🎉</h2>
          
          <div className="dashboard-card success-card">
            <h3>✅ Login Automático Configurado</h3>
            <p>El sistema de reconocimiento de tablet está funcionando correctamente.</p>
          </div>

          <div className="dashboard-card">
            <h3>Información del Catador</h3>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mesa:</strong> {user.mesa}</p>
            <p><strong>Puesto:</strong> {user.puesto}</p>
            <p><strong>Tablet:</strong> #{user.ntablet}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
          </div>
          
          <div className="dashboard-card">
            <h3>🔒 Cómo funciona el sistema</h3>
            <ul>
              <li><strong>Primera vez:</strong> Inicias sesión con tu email y la tablet se asocia automáticamente</li>
              <li><strong>Próximas veces:</strong> La tablet te reconoce automáticamente</li>
              <li><strong>Seguridad:</strong> Cada tablet tiene una huella digital única</li>
              <li><strong>Persistencia:</strong> Tu sesión se mantiene entre reinicios</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>📱 Tablets de Prueba Activas</h3>
            <div className="test-users">
              <p><strong>Puedes probar con estos usuarios:</strong></p>
              <ul>
                <li>mesa1a@gmail.com - RITA PINTO (Tablet #25)</li>
                <li>mesa1b@gmail.com - ADELA VIZCAY (Tablet #3)</li>
                <li>mesa2a@gmail.com - JOÃO PALMA (Tablet #9)</li>
                <li>mesa3a@gmail.com - JOSE FIGUEIREDO (Tablet #12)</li>
                <li>mesa4a@gmail.com - VASCO FERNANDES (Tablet #20)</li>
              </ul>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>🚀 Próximos Pasos</h3>
            <ul>
              <li>✅ <strong>Sistema de login automático</strong> - Completado</li>
              <li>⏳ Formularios de cata y evaluación</li>
              <li>⏳ Sistema de puntuación</li>
              <li>⏳ Historial de catas del catador</li>
              <li>⏳ Reportes y estadísticas</li>
            </ul>
          </div>

          {isAdmin && (
            <div className="dashboard-card admin-info">
              <h3>👑 Panel de Administración</h3>
              <p>Como administrador, tienes acceso a funcionalidades adicionales del sistema.</p>
              <p>El sistema está listo para implementar la gestión completa de tablets y catadores.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;