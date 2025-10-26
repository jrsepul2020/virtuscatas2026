import { useState } from 'react';
import { useDeviceAuth } from '../hooks/useDeviceAuth';
import './Login.css';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { user, loading, error, loginByEmail, getTabletId } = useDeviceAuth();
  const [email, setEmail] = useState('');
  const [isManualLogin, setIsManualLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoginLoading(true);
    const success = await loginByEmail(email.trim());
    
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
    setLoginLoading(false);
  };

  const showDeviceInfo = () => {
    const tabletId = getTabletId();
    alert(`ID de esta tablet: ${tabletId.substring(0, 20)}...`);
  };

  // Si está cargando la verificación automática
  if (loading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-loading">
            <div className="spinner"></div>
            <h2>Verificando tablet...</h2>
            <p>Buscando catador asignado a este dispositivo</p>
          </div>
        </div>
      </div>
    );
  }

  // Si ya hay un usuario logueado
  if (user) {
    return (
      <div className="login-container">
        <div className="login-card success">
          <div className="user-info">
            <h2>¡Bienvenido!</h2>
            <div className="user-details">
              <p><strong>Catador:</strong> {user.nombre || user.email}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tablet:</strong> {user.ntablet?.substring(0, 20)}...</p>
            </div>
            <button 
              className="btn-primary"
              onClick={onLoginSuccess}
            >
              Continuar a la aplicación
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no se encontró usuario automáticamente
  return (
    <div className="login-container">
      <div className="login-card">
        {!isManualLogin ? (
          <div className="auto-login-failed">
            <h2>Tablet no reconocida</h2>
            <p>No se encontró un catador asignado a esta tablet.</p>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="login-options">
              <button 
                className="btn-primary"
                onClick={() => setIsManualLogin(true)}
              >
                Iniciar sesión manual
              </button>
              
              <button 
                className="btn-secondary"
                onClick={showDeviceInfo}
              >
                Ver ID de tablet
              </button>
            </div>

            <div className="help-text">
              <p>
                <strong>¿Primera vez?</strong><br />
                Inicia sesión con tu email para asignar esta tablet a tu perfil.
              </p>
            </div>
          </div>
        ) : (
          <div className="manual-login">
            <h2>Iniciar Sesión</h2>
            
            <form onSubmit={handleManualLogin}>
              <div className="form-group">
                <label htmlFor="email">Email del catador:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu-email@ejemplo.com"
                  required
                  disabled={loginLoading}
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loginLoading || !email.trim()}
                >
                  {loginLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
                
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsManualLogin(false)}
                  disabled={loginLoading}
                >
                  Volver
                </button>
              </div>
            </form>

            <div className="help-text">
              <p>
                Al iniciar sesión, esta tablet se asignará automáticamente a tu perfil para futuros accesos.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};