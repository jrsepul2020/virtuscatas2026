import React, { useState } from 'react';
import { Logo } from './Logo';
import './Dashboard.css';

interface User {
  id: number;
  email: string;
  nombre: string;
  apellidos?: string;
  mesa?: number;
  puesto?: number;
  ntablet: number | string;
  rol: string;
  experiencia?: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveSection = 'home' | 'catas' | 'profile' | 'history';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const isAdmin = user.rol === 'admin';

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="dashboard-home">
            <div className="welcome-section">
              <div className="welcome-header">
                <Logo variant="principal" size="large" className="welcome-logo" />
                <div className="welcome-text">
                  <h2>Bienvenido, {user.nombre}</h2>
                  <p className="welcome-subtitle">Sistema de Catas Virtus International Awards 2026</p>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card info-card">
                <div className="card-header">
                  <h3>👤 Mi Información</h3>
                </div>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label">Nombre:</span>
                    <span className="info-value">{user.nombre} {user.apellidos || ''}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  {user.mesa && (
                    <div className="info-row">
                      <span className="info-label">Mesa:</span>
                      <span className="info-value">{user.mesa}</span>
                    </div>
                  )}
                  {user.puesto && (
                    <div className="info-row">
                      <span className="info-label">Puesto:</span>
                      <span className="info-value">{user.puesto}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Tablet:</span>
                    <span className="info-value">#{user.ntablet}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Rol:</span>
                    <span className={`info-value badge ${user.rol}`}>{user.rol}</span>
                  </div>
                  {user.experiencia && (
                    <div className="info-row">
                      <span className="info-label">Experiencia:</span>
                      <span className="info-value">{user.experiencia}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="dashboard-card status-card">
                <div className="card-header">
                  <h3>📱 Estado del Sistema</h3>
                </div>
                <div className="card-content">
                  <div className="status-item">
                    <div className="status-indicator online"></div>
                    <span>Conexión: Online</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator success"></div>
                    <span>Tablet: Reconocida</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator success"></div>
                    <span>PWA: Instalada</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator success"></div>
                    <span>Sesión: Activa</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card actions-card">
                <div className="card-header">
                  <h3>⚡ Acciones Rápidas</h3>
                </div>
                <div className="card-content">
                  <button 
                    className="action-btn primary"
                    onClick={() => setActiveSection('catas')}
                  >
                    📝 Ver Catas Asignadas
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => setActiveSection('history')}
                  >
                    📊 Mi Historial
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => setActiveSection('profile')}
                  >
                    ⚙️ Mi Perfil
                  </button>
                </div>
              </div>

              {isAdmin && (
                <div className="dashboard-card admin-card">
                  <div className="card-header">
                    <h3>👑 Panel de Administración</h3>
                  </div>
                  <div className="card-content">
                    <p>Como administrador, tienes acceso a funcionalidades adicionales:</p>
                    <ul>
                      <li>Gestión de catadores</li>
                      <li>Asignación de tablets</li>
                      <li>Reportes y estadísticas</li>
                      <li>Configuración del sistema</li>
                    </ul>
                    <button className="action-btn admin">
                      🛠️ Panel Admin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'catas':
        return (
          <div className="section-content">
            <h2>📝 Mis Catas Asignadas</h2>
            <div className="catas-grid">
              <div className="cata-card pending">
                <h3>Cata de Tintos Premium</h3>
                <p><strong>Fecha:</strong> 15 de Noviembre, 2026</p>
                <p><strong>Hora:</strong> 14:30 - 16:00</p>
                <p><strong>Vinos:</strong> 6 muestras</p>
                <p><strong>Estado:</strong> <span className="status pending">Pendiente</span></p>
                <button className="action-btn primary">Iniciar Cata</button>
              </div>
              
              <div className="cata-card upcoming">
                <h3>Cata de Blancos Internacionales</h3>
                <p><strong>Fecha:</strong> 16 de Noviembre, 2026</p>
                <p><strong>Hora:</strong> 10:00 - 11:30</p>
                <p><strong>Vinos:</strong> 8 muestras</p>
                <p><strong>Estado:</strong> <span className="status upcoming">Próxima</span></p>
                <button className="action-btn secondary">Ver Detalles</button>
              </div>

              <div className="cata-card completed">
                <h3>Cata de Rosados</h3>
                <p><strong>Fecha:</strong> 10 de Noviembre, 2026</p>
                <p><strong>Hora:</strong> 16:00 - 17:30</p>
                <p><strong>Vinos:</strong> 5 muestras</p>
                <p><strong>Estado:</strong> <span className="status completed">Completada</span></p>
                <button className="action-btn secondary">Ver Resultados</button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="section-content">
            <h2>⚙️ Mi Perfil</h2>
            <div className="profile-content">
              <div className="profile-section">
                <h3>Información Personal</h3>
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" value={`${user.nombre} ${user.apellidos || ''}`} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} readOnly />
                </div>
                <div className="form-group">
                  <label>Experiencia en Catas</label>
                  <input type="text" value={user.experiencia || 'No especificada'} readOnly />
                </div>
              </div>

              <div className="profile-section">
                <h3>Configuración de Tablet</h3>
                <div className="form-group">
                  <label>ID de Tablet</label>
                  <input type="text" value={user.ntablet} readOnly />
                </div>
                <div className="form-group">
                  <label>Mesa Asignada</label>
                  <input type="text" value={user.mesa || 'No asignada'} readOnly />
                </div>
                <div className="form-group">
                  <label>Puesto</label>
                  <input type="text" value={user.puesto || 'No asignado'} readOnly />
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="section-content">
            <h2>📊 Mi Historial de Catas</h2>
            <div className="history-stats">
              <div className="stat-card">
                <h3>12</h3>
                <p>Catas Completadas</p>
              </div>
              <div className="stat-card">
                <h3>84</h3>
                <p>Vinos Evaluados</p>
              </div>
              <div className="stat-card">
                <h3>8.7</h3>
                <p>Puntuación Media</p>
              </div>
              <div className="stat-card">
                <h3>94%</h3>
                <p>Tasa de Acierto</p>
              </div>
            </div>
            
            <div className="history-list">
              <h3>Últimas Catas</h3>
              <div className="history-item">
                <div className="history-date">10 Nov 2026</div>
                <div className="history-details">
                  <h4>Cata de Rosados</h4>
                  <p>5 vinos evaluados - Puntuación: 8.4/10</p>
                </div>
                <div className="history-status completed">Completada</div>
              </div>
              <div className="history-item">
                <div className="history-date">8 Nov 2026</div>
                <div className="history-details">
                  <h4>Cata de Espumosos</h4>
                  <p>7 vinos evaluados - Puntuación: 9.1/10</p>
                </div>
                <div className="history-status completed">Completada</div>
              </div>
              <div className="history-item">
                <div className="history-date">5 Nov 2026</div>
                <div className="history-details">
                  <h4>Cata de Blancos Premium</h4>
                  <p>6 vinos evaluados - Puntuación: 8.8/10</p>
                </div>
                <div className="history-status completed">Completada</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <Logo variant="horizontal" size="medium" className="header-logo-img" />
          </div>
          <div className="header-actions">
            <div className="user-info">
              <span className="user-greeting">👋 {user.nombre}</span>
              <span className="user-role">{user.rol}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => setActiveSection('home')}
        >
          🏠 Inicio
        </button>
        <button 
          className={`nav-btn ${activeSection === 'catas' ? 'active' : ''}`}
          onClick={() => setActiveSection('catas')}
        >
          📝 Mis Catas
        </button>
        <button 
          className={`nav-btn ${activeSection === 'history' ? 'active' : ''}`}
          onClick={() => setActiveSection('history')}
        >
          📊 Historial
        </button>
        <button 
          className={`nav-btn ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          ⚙️ Perfil
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;