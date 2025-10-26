-- Tabla de catadores con sistema de tablets
-- Ejecutar este SQL en el editor de Supabase

CREATE TABLE IF NOT EXISTS catadores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  apellidos VARCHAR(255),
  telefono VARCHAR(20),
  ntablet TEXT, -- ID único de la tablet asignada
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activo BOOLEAN DEFAULT true,
  
  -- Información adicional del catador
  experiencia TEXT, -- 'principiante', 'intermedio', 'experto'
  especialidades TEXT[], -- Array de especialidades
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_catadores_email ON catadores(email);
CREATE INDEX IF NOT EXISTS idx_catadores_ntablet ON catadores(ntablet);
CREATE INDEX IF NOT EXISTS idx_catadores_activo ON catadores(activo);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER update_catadores_updated_at 
    BEFORE UPDATE ON catadores 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos catadores de ejemplo
INSERT INTO catadores (email, nombre, apellidos, experiencia) VALUES
  ('catador1@example.com', 'Juan', 'Pérez', 'experto'),
  ('catador2@example.com', 'María', 'García', 'intermedio'),
  ('catador3@example.com', 'Carlos', 'López', 'principiante'),
  ('admin@virtuscatas.com', 'Administrador', 'Sistema', 'experto')
ON CONFLICT (email) DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE catadores ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a usuarios autenticados
CREATE POLICY "Catadores pueden ver sus propios datos" ON catadores
    FOR SELECT USING (true); -- Por ahora permitimos ver todos, ajustar según necesidades

-- Política para permitir actualización de datos propios
CREATE POLICY "Catadores pueden actualizar sus propios datos" ON catadores
    FOR UPDATE USING (true); -- Por ahora permitimos actualizar todos, ajustar según necesidades

-- Función para buscar catador por tablet
CREATE OR REPLACE FUNCTION get_catador_by_tablet(tablet_id TEXT)
RETURNS TABLE (
  id UUID,
  email VARCHAR(255),
  nombre VARCHAR(255),
  apellidos VARCHAR(255),
  ntablet TEXT,
  experiencia TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.email,
    c.nombre,
    c.apellidos,
    c.ntablet,
    c.experiencia
  FROM catadores c
  WHERE c.ntablet = tablet_id AND c.activo = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;