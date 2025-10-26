import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Catador {
  id: string;
  email: string;
  ntablet: string;
  nombre?: string;
}

interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  screenResolution: string;
  platform: string;
  language: string;
}

export const useDeviceAuth = () => {
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

  // Buscar catador por ID de tablet
  const findCatadorByTablet = async (tabletId: string): Promise<Catador | null> => {
    try {
      // Primero intentar buscar por huella digital (nueva implementación)
      const { data, error } = await supabase
        .from('catadores')
        .select('*')
        .eq('ntablet', tabletId)
        .eq('rol', 'admin') // Solo usuarios activos (adaptado a tu estructura)
        .single();

      // Si no encuentra por huella digital, intentar buscar por número de tablet guardado en localStorage
      if (error && error.code === 'PGRST116') {
        // Intentar con el número de tablet si tenemos uno guardado
        const savedTabletNumber = localStorage.getItem('virtus_tablet_number');
        if (savedTabletNumber) {
          const { data: data2, error: error2 } = await supabase
            .from('catadores')
            .select('*')
            .eq('ntablet', parseInt(savedTabletNumber))
            .eq('rol', 'admin')
            .single();
          
          if (!error2 && data2) {
            // Actualizar con la nueva huella digital
            await supabase
              .from('catadores')
              .update({ ntablet: tabletId })
              .eq('id', data2.id);
            
            return { ...data2, ntablet: tabletId };
          }
        }
        return null;
      }

      if (error) {
        console.error('Error buscando catador:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error en consulta:', err);
      return null;
    }
  };

  // Registrar nueva tablet para un catador
  const assignTabletToCatador = async (email: string): Promise<boolean> => {
    const tabletId = getTabletId();
    
    try {
      const { error } = await supabase
        .from('catadores')
        .update({ ntablet: tabletId })
        .eq('email', email);

      if (error) {
        console.error('Error asignando tablet:', error);
        return false;
      }

      // Recargar usuario después de asignar tablet
      const catador = await findCatadorByTablet(tabletId);
      setUser(catador);
      return true;
    } catch (err) {
      console.error('Error en asignación:', err);
      return false;
    }
  };

  // Login manual por email
  const loginByEmail = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('catadores')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        setError('Catador no encontrado');
        return false;
      }

      // Si el catador no tiene tablet asignada, asignar esta
      if (!data.ntablet) {
        const assigned = await assignTabletToCatador(email);
        return assigned;
      }

      // Si tiene tablet diferente, mostrar opción de reasignar
      const currentTabletId = getTabletId();
      if (data.ntablet !== currentTabletId) {
        setError('Este catador está asignado a otra tablet');
        return false;
      }

      setUser(data);
      return true;
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
  };

    // Verificación automática al cargar
  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true);
      setError(null);

      try {
        // Primero verificar si hay usuario guardado en localStorage
        const savedUser = localStorage.getItem('virtus_current_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const tabletId = getTabletId();
          
          // Verificar que la tablet coincida
          if (userData.ntablet === tabletId) {
            setUser(userData);
            setLoading(false);
            return;
          }
        }

        // Si no hay usuario guardado, buscar por ID de tablet
        const tabletId = getTabletId();
        const catador = await findCatadorByTablet(tabletId);

        if (catador) {
          setUser(catador);
          localStorage.setItem('virtus_current_user', JSON.stringify(catador));
        }
      } catch (err) {
        console.error('Error en auto-login:', err);
        setError('Error al verificar usuario');
      } finally {
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
    assignTabletToCatador,
    getTabletId,
  };
};