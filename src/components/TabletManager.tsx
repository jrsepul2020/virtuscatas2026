import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './TabletManager.css';

interface Catador {
  id: string;
  email: string;
  nombre?: string;
  apellidos?: string;
  ntablet?: string;
  activo: boolean;
}

export const TabletManager: React.FC = () => {
  const [catadores, setCatadores] = useState<Catador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCatadores();
  }, []);

  const loadCatadores = async () => {
    try {
      const { data, error } = await supabase
        .from('catadores')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      setCatadores(data || []);
    } catch (err) {
      console.error('Error cargando catadores:', err);
      setError('Error al cargar la lista de catadores');
    } finally {
      setLoading(false);
    }
  };

  const clearTablet = async (catadorId: string) => {
    if (!confirm('¿Estás seguro de que quieres desasignar esta tablet?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('catadores')
        .update({ ntablet: null })
        .eq('id', catadorId);

      if (error) throw error;
      
      await loadCatadores();
      alert('Tablet desasignada correctamente');
    } catch (err) {
      console.error('Error desasignando tablet:', err);
      alert('Error al desasignar la tablet');
    }
  };

  const toggleActive = async (catadorId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('catadores')
        .update({ activo: !currentStatus })
        .eq('id', catadorId);

      if (error) throw error;
      
      await loadCatadores();
    } catch (err) {
      console.error('Error cambiando estado:', err);
      alert('Error al cambiar el estado del catador');
    }
  };

  const filteredCatadores = catadores.filter(catador =>
    catador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (catador.nombre && catador.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (catador.apellidos && catador.apellidos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="tablet-manager">
        <div className="loading">Cargando catadores...</div>
      </div>
    );
  }

  return (
    <div className="tablet-manager">
      <div className="manager-header">
        <h2>Gestión de Tablets</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar catador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="catadores-grid">
        {filteredCatadores.map((catador) => (
          <div key={catador.id} className={`catador-card ${!catador.activo ? 'inactive' : ''}`}>
            <div className="catador-info">
              <h3>{catador.nombre && catador.apellidos 
                ? `${catador.nombre} ${catador.apellidos}` 
                : catador.email}
              </h3>
              <p className="email">{catador.email}</p>
              
              <div className="tablet-info">
                {catador.ntablet ? (
                  <>
                    <span className="tablet-assigned">
                      ✅ Tablet asignada
                    </span>
                    <p className="tablet-id">
                      ID: {catador.ntablet.substring(0, 20)}...
                    </p>
                    <button 
                      className="btn-clear-tablet"
                      onClick={() => clearTablet(catador.id)}
                    >
                      Desasignar Tablet
                    </button>
                  </>
                ) : (
                  <span className="tablet-unassigned">
                    ❌ Sin tablet asignada
                  </span>
                )}
              </div>
            </div>

            <div className="catador-actions">
              <button 
                className={`btn-toggle ${catador.activo ? 'active' : 'inactive'}`}
                onClick={() => toggleActive(catador.id, catador.activo)}
              >
                {catador.activo ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCatadores.length === 0 && (
        <div className="no-results">
          No se encontraron catadores con el término de búsqueda.
        </div>
      )}

      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">{catadores.length}</span>
          <span className="stat-label">Total catadores</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {catadores.filter(c => c.ntablet).length}
          </span>
          <span className="stat-label">Con tablet asignada</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {catadores.filter(c => c.activo).length}
          </span>
          <span className="stat-label">Activos</span>
        </div>
      </div>
    </div>
  );
};