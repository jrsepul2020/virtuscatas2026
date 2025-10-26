import React from 'react';

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

interface SimpleDashboardProps {
  user: User;
  onLogout: () => void;
}

const SimpleDashboard: React.FC<SimpleDashboardProps> = ({ user, onLogout }) => {
  console.log('SimpleDashboard render - User:', user);

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'white', 
      minHeight: '100%',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        background: '#9B8658',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Virtus Catas 2026</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Bienvenido, {user.nombre}</span>
          <button 
            onClick={onLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{
          background: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h2>Información del Catador</h2>
          <p><strong>Nombre:</strong> {user.nombre} {user.apellidos || ''}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mesa:</strong> {user.mesa || 'No asignada'}</p>
          <p><strong>Puesto:</strong> {user.puesto || 'No asignado'}</p>
          <p><strong>Tablet:</strong> #{user.ntablet}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
          {user.experiencia && <p><strong>Experiencia:</strong> {user.experiencia}</p>}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h3>📝 Mis Catas</h3>
            <p>Próximamente: Sistema de catas asignadas</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h3>📊 Estadísticas</h3>
            <p>Próximamente: Historial y estadísticas</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h3>⚙️ Configuración</h3>
            <p>Próximamente: Configuración de perfil</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleDashboard;