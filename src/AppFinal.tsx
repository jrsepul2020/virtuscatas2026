
import { LoginAdapted } from './components/LoginAdapted';
import { useDeviceAuthAdapted } from './hooks/useDeviceAuthAdapted';
import UpdateNotification from './components/UpdateNotification';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const { user, logout } = useDeviceAuthAdapted();

  console.log('App render - User:', user);

  // Si no hay usuario logueado, mostrar login
  if (!user) {
    console.log('No user, showing login');
    return (
      <>
        <UpdateNotification />
        <LoginAdapted />
      </>
    );
  }

  // Si hay usuario logueado, mostrar dashboard directamente
  console.log('User found, showing dashboard:', user);

  return (
    <>
      <UpdateNotification />
      <Dashboard user={user} onLogout={logout} />
    </>
  );
}

export default App;