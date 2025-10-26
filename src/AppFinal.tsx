
import { LoginAdapted } from './components/LoginAdapted';
import { useDeviceAuthAdapted } from './hooks/useDeviceAuthAdapted';
import UpdateNotification from './components/UpdateNotification';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuthAdapted();

  // Si no hay usuario logueado, mostrar login
  if (!user) {
    return (
      <>
        <UpdateNotification />
        <LoginAdapted />
      </>
    );
  }

  // Si hay usuario logueado, mostrar dashboard directamente
  return (
    <>
      <UpdateNotification />
      <Dashboard user={user} onLogout={logout} />
    </>
  );
}

export default App;