import { useState } from 'react';
import { useDeviceAuthAdapted } from '../hooks/useDeviceAuthAdapted';
import './Login.css';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export const LoginAdapted: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { user, loading, error, loginByEmail, getTabletId } = useDeviceAuthAdapted();
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
    alert(`ID único de esta tablet: ${tabletId.substring(0, 30)}...`);
  };

  const quickLogin = async (testEmail: string) => {
    setLoginLoading(true);
    setEmail(testEmail);
    const success = await loginByEmail(testEmail);
    
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
    setLoginLoading(false);
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
            <div className="login-logo">
              <img src="/logos/virtus-logo-principal.svg" alt="Virtus International Awards" className="logo-login" />
            </div>
            <h2>¡Bienvenido de vuelta! 🎉</h2>
            <div className="user-details">
              <p><strong>Catador:</strong> {user.nombre}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mesa:</strong> {user.mesa} - Puesto: {user.puesto}</p>
              <p><strong>Tablet:</strong> #{user.ntablet}</p>
            </div>
            <button 
              className="btn-primary"
              onClick={onLoginSuccess}
            >
              Acceder al Sistema
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
            <div className="login-logo">
              <img src="/logos/virtus-logo-principal.svg" alt="Virtus International Awards" className="logo-login" />
            </div>
            <h2>Sistema de Catas Virtus 2026</h2>
            <p>Tablet no reconocida - Primera vez en este dispositivo</p>
            
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
                Iniciar Sesión
              </button>
              
              <button 
                className="btn-secondary"
                onClick={showDeviceInfo}
              >
                Ver ID de dispositivo
              </button>
            </div>

            <div className="quick-test">
              <p><strong>🧪 Pruebas rápidas:</strong></p>
              <div className="test-buttons">
                <button 
                  className="btn-test"
                  onClick={() => quickLogin('mesa1a@gmail.com')}
                  disabled={loginLoading}
                >
                  RITA PINTO
                </button>
                <button 
                  className="btn-test"
                  onClick={() => quickLogin('mesa2a@gmail.com')}
                  disabled={loginLoading}
                >
                  JOÃO PALMA
                </button>
              </div>
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
            <div className="login-logo">
              <img src="/logos/virtus-logo-principal.svg" alt="Virtus International Awards" className="logo-login" />
            </div>
            <h2>Iniciar Sesión</h2>
            
            <form onSubmit={handleManualLogin}>
              <div className="form-group">
                <label htmlFor="email">Email del catador:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mesa1a@gmail.com"
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

            <div className="available-users">
              <p><strong>Usuarios de prueba disponibles:</strong></p>
              <ul>
                <li>mesa1a@gmail.com - RITA PINTO</li>
                <li>mesa1b@gmail.com - ADELA VIZCAY</li>
                <li>mesa2a@gmail.com - JOÃO PALMA</li>
                <li>mesa3a@gmail.com - JOSE FIGUEIREDO</li>
                <li>mesa4a@gmail.com - VASCO FERNANDES</li>
              </ul>
            </div>

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