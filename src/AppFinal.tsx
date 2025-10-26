import { useState } from 'react';
import { LoginAdapted } from './components/LoginAdapted';
import { useDeviceAuthAdapted } from './hooks/useDeviceAuthAdapted';
import UpdateNotification from './components/UpdateNotification';
import Dashboard from './components/Dashboard';
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

  // Aplicación principal para catadores logueados
  return (
    <>
      <UpdateNotification />
      <Dashboard user={user} onLogout={logout} />
    </>
  );
}

export default App;