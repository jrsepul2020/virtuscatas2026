import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Catador {
  id: number;
  email: string;
  nombre: string;
  ntablet: number | string;
  rol: string;
  mesa?: number;
  puesto?: number;
}

interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  screenResolution: string;
  platform: string;
  language: string;
}

export const useDeviceAuthAdapted = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Catador | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Generar huella digital del dispositivo
  const generateDeviceFingerprint = (): DeviceInfo => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('Device fingerprint', 2, 2);
    const canvasFingerprint = canvas.toDataURL();

    const deviceInfo: DeviceInfo = {
      deviceId: '',
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      platform: navigator.platform,
      language: navigator.language,
    };

    // Crear ID único basado en características del dispositivo
    const fingerprint = btoa(
      deviceInfo.userAgent + 
      deviceInfo.screenResolution + 
      deviceInfo.platform + 
      deviceInfo.language +
      canvasFingerprint
    );

    deviceInfo.deviceId = fingerprint;
    return deviceInfo;
  };

  // Obtener o crear ID de tablet
  const getTabletId = (): string => {
    let tabletId = localStorage.getItem('virtus_tablet_id');
    
    if (!tabletId) {
      const deviceInfo = generateDeviceFingerprint();
      tabletId = deviceInfo.deviceId;
      localStorage.setItem('virtus_tablet_id', tabletId);
      localStorage.setItem('virtus_device_info', JSON.stringify(deviceInfo));
    }
    
    return tabletId;
  };

  // Buscar catador por email
  const findCatadorByEmail = async (email: string): Promise<Catador | null> => {
    try {
      const { data, error } = await supabase
        .from('catadores')
        .select('*')
        .eq('email', email)
        .eq('rol', 'admin') // Solo usuarios activos
        .single();

      if (error) {
        console.error('Error buscando catador por email:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error en consulta por email:', err);
      return null;
    }
  };

  // Buscar catador por número de tablet (sistema existente)
  const findCatadorByTabletNumber = async (tabletNumber: number): Promise<Catador | null> => {
    try {
      const { data, error } = await supabase
        .from('catadores')
        .select('*')
        .eq('ntablet', tabletNumber)
        .eq('rol', 'admin') // Solo usuarios activos
        .single();

      if (error) {
        console.error('Error buscando catador por tablet:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error en consulta por tablet:', err);
      return null;
    }
  };

  // Asignar tablet a catador (actualizar con huella digital)
  const assignTabletToCatador = async (email: string): Promise<boolean> => {
    // Generar huella digital para esta tablet
    getTabletId(); // Asegurar que se genere y guarde la huella digital
    
    try {
      // Buscar catador por email
      const catador = await findCatadorByEmail(email);
      
      if (!catador) {
        setError('Catador no encontrado o no activo');
        return false;
      }

      // Guardar el número de tablet original para referencia
      localStorage.setItem('virtus_tablet_number', catador.ntablet.toString());
      
      // Actualizar con la huella digital (mantenemos compatibilidad)
      const { error } = await supabase
        .from('catadores')
        .update({ 
          // Aquí podrías crear un campo nuevo para la huella digital o usar el existente
          // Por ahora mantenemos el sistema existente y guardamos la huella en localStorage
        })
        .eq('id', catador.id);

      if (error) {
        console.error('Error asignando tablet:', error);
        return false;
      }

      // Guardar datos del usuario
      setUser(catador);
      localStorage.setItem('virtus_current_user', JSON.stringify(catador));
      localStorage.setItem('virtus_assigned_tablet', catador.ntablet.toString());
      
      return true;
    } catch (err) {
      console.error('Error en asignación:', err);
      return false;
    }
  };

  // Login por email
  const loginByEmail = async (email: string): Promise<boolean> => {
    try {
      setError(null);
      const success = await assignTabletToCatador(email);
      return success;
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión');
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('virtus_current_user');
    localStorage.removeItem('virtus_assigned_tablet');
  };

  // Verificación automática al cargar
  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true);
      setError(null);

      try {
        // Verificar si hay usuario guardado en localStorage
        const savedUser = localStorage.getItem('virtus_current_user');
        const assignedTablet = localStorage.getItem('virtus_assigned_tablet');
        
        if (savedUser && assignedTablet) {
          const userData = JSON.parse(savedUser);
          
          // Verificar que el catador sigue activo y asignado a esta tablet
          const currentCatador = await findCatadorByTabletNumber(parseInt(assignedTablet));
          
          if (currentCatador && currentCatador.email === userData.email) {
            setUser(currentCatador);
            setLoading(false);
            return;
          } else {
            // Limpiar datos obsoletos
            localStorage.removeItem('virtus_current_user');
            localStorage.removeItem('virtus_assigned_tablet');
          }
        }

        // Si no hay sesión guardada válida, mostrar login
        setLoading(false);
        
      } catch (err) {
        console.error('Error en auto-login:', err);
        setError('Error al verificar usuario');
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('virtus_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('virtus_current_user');
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    loginByEmail,
    logout,
    getTabletId,
  };
};