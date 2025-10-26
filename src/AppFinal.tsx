import { useState } from 'react';
import { LoginAdapted } from './components/LoginAdapted';
import { useDeviceAuthAdapted } from './hooks/useDeviceAuthAdapted';
import UpdateNotification from './components/UpdateNotification';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuthAdapted();
  const [showApp, setShowApp] = useState(false);

  // Si no hay usuario logueado o no se ha mostrado la app, mostrar login
  if (!user || !showApp) {
    return (
      <>
        <UpdateNotification />
        <LoginAdapted onLoginSuccess={() => setShowApp(true)} />
      </>
    );
  }

  // Verificar si el usuario es administrador
  const isAdmin = user.rol === 'admin';

  // Aplicación principal para catadores logueados
  return (
    <div className="app">
      <UpdateNotification />
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <img src="/logos/virtus-logo-horizontal.svg" alt="Virtus International Awards" className="logo-header" />
            <h1>Catas 2026</h1>
          </div>

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
          <div className="dashboard-title">
            <img src="/logos/virtus-logo-principal.svg" alt="Virtus" className="logo-dashboard" />
            <h2>¡Sistema Funcionando! 🎉</h2>
          </div>
          
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
            <h3>📱 Prueba el Sistema</h3>
            <div className="test-instructions">
              <p><strong>Para probar el login automático:</strong></p>
              <ol>
                <li>Cierra sesión usando el botón "Cerrar Sesión"</li>
                <li>Recarga la página (F5)</li>
                <li>¡Deberías ser reconocido automáticamente!</li>
              </ol>
              <p><em>Si abres en otra pestaña/navegador, aparecerá como "tablet nueva" y pedirá login manual.</em></p>
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