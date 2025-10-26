import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import './UpdateNotification.css';

const UpdateNotification: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
    onNeedRefresh() {
      setShowUpdatePrompt(true);
    },
    onOfflineReady() {
      // Solo mostrar el mensaje offline la primera vez
      if (!localStorage.getItem('offline-ready-shown')) {
        setTimeout(() => {
          setOfflineReady(true);
        }, 2000);
        localStorage.setItem('offline-ready-shown', 'true');
      }
    },
  });

  // Auto-cerrar la notificación offline tras unos segundos
  useEffect(() => {
    if (offlineReady) {
      const t = setTimeout(() => {
        setOfflineReady(false);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [offlineReady, setOfflineReady]);

  // Si hay actualización disponible y no se pulsa nada, actualizar automáticamente tras unos segundos
  useEffect(() => {
    if (showUpdatePrompt) {
      const t = setTimeout(() => {
        updateServiceWorker(true);
        setShowUpdatePrompt(false);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [showUpdatePrompt, updateServiceWorker]);

  const updateApp = () => {
    setShowUpdatePrompt(false);
    updateServiceWorker(true);
  };

  const closeUpdatePrompt = () => {
    setShowUpdatePrompt(false);
  };

  const closeOfflinePrompt = () => {
    setOfflineReady(false);
  };

  if (showUpdatePrompt) {
    return (
      <div className="update-notification-overlay">
        <div className="update-notification">
          <div className="update-header">
            <div className="update-icon">🔄</div>
            <h3>¡Actualización Disponible!</h3>
          </div>
          <p>
            Hay una nueva versión de la aplicación disponible con mejoras y correcciones.
          </p>
          <div className="update-actions">
            <button 
              className="update-btn update-now" 
              onClick={updateApp}
            >
              Actualizar Ahora
            </button>
            <button 
              className="update-btn update-later" 
              onClick={closeUpdatePrompt}
            >
              Más Tarde
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div className="update-notification-overlay">
        <div className="update-notification offline-ready">
          <div className="update-header">
            <div className="update-icon">✅</div>
            <h3>¡App Lista para Usar Sin Conexión!</h3>
          </div>
          <p>
            La aplicación ahora funciona sin conexión a internet.
          </p>
          <div className="update-actions">
            <button 
              className="update-btn update-now" 
              onClick={closeOfflinePrompt}
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UpdateNotification;