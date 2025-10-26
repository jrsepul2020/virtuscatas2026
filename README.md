# 🍷 Virtus International Awards - Catadores 2026

## 📱 Progressive Web App for Tablet-Based Wine Tasting

Sistema de login automático para catadores de vino en tablets con funcionalidades PWA completas.

## 🚀 Características

- **Login automático**: Reconoce tablets y asigna automáticamente el catador correspondiente
- **Huella digital del dispositivo**: Identificación única basada en múltiples características del dispositivo
- **Gestión de tablets**: Panel administrativo para gestionar asignaciones
- **Base de datos Supabase**: Backend completo con autenticación y base de datos
- **Interfaz responsiva**: Diseñada especialmente para tablets

## 🛠️ Configuración

### 1. Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve al editor SQL y ejecuta el script `database/setup_catadores.sql`
3. Copia las credenciales de tu proyecto al archivo `.env`

### 2. Variables de entorno

Crea o actualiza el archivo `.env` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### 3. Instalación

```bash
npm install
npm run dev
```

## 📋 Estructura de la Base de Datos

### Tabla `catadores`
- `id`: UUID único del catador
- `email`: Email único del catador
- `nombre`: Nombre del catador
- `apellidos`: Apellidos del catador
- `ntablet`: ID único de la tablet asignada
- `activo`: Estado del catador (activo/inactivo)
- `experiencia`: Nivel de experiencia
- `created_at`, `updated_at`: Timestamps

## 🔧 Cómo Funciona el Sistema

### 1. Identificación de Tablet

El sistema genera una huella digital única basada en:
- User Agent del navegador
- Resolución de pantalla
- Plataforma del dispositivo
- Idioma del sistema
- Canvas fingerprinting

### 2. Proceso de Login

1. **Automático**: Al abrir la app, busca un catador asignado a la tablet actual
2. **Manual**: Si no encuentra catador asignado, permite login por email
3. **Asignación**: Al hacer login manual, asigna automáticamente la tablet al catador
4. **Persistencia**: Guarda la sesión en localStorage para accesos futuros

### 3. Flujo de Usuario

```
Tablet detectada → ¿Catador asignado? → Sí → Login automático
                                     → No → Pantalla de login manual
                                          → Ingresar email
                                          → Asignar tablet
                                          → Login exitoso
```

## 🎛️ Gestión Administrativa

### Panel de Gestión de Tablets

Para acceder al panel de gestión (solo administradores):
- Permite ver todos los catadores registrados
- Muestra qué tablets están asignadas
- Permite desasignar tablets
- Activar/desactivar catadores

## 📱 Uso en Tablet

### Primera Configuración
1. Abrir la aplicación en la tablet
2. Si es la primera vez, aparecerá la pantalla de login
3. Ingresar el email del catador asignado a esta tablet
4. La tablet quedará automáticamente asignada

### Accesos Posteriores
- La aplicación reconocerá automáticamente la tablet
- Login inmediato sin necesidad de credenciales

## 🔒 Seguridad

- **Row Level Security**: Habilitado en Supabase
- **Validación del dispositivo**: Múltiples características para identificación
- **Sesiones persistentes**: Almacenamiento seguro en localStorage
- **Desasignación**: Posibilidad de desasignar tablets comprometidas

## 🚨 Gestión de Incidencias

### Tablet Perdida o Robada
1. Ir al panel de gestión
2. Buscar el catador afectado
3. Hacer clic en "Desasignar Tablet"
4. El catador podrá asignar una nueva tablet

### Cambio de Tablet
1. Desasignar la tablet antigua desde el panel
2. En la nueva tablet, hacer login manual
3. Se asignará automáticamente la nueva tablet

### Tablet Compartida (Error)
- El sistema no permite múltiples catadores en la misma tablet
- Cada tablet debe tener un catador único asignado

## 📈 Próximas Funcionalidades

- [ ] Sistema de catas y evaluaciones
- [ ] Formularios de puntuación
- [ ] Historial de catas del catador
- [ ] Estadísticas y reportes
- [ ] Sincronización offline
- [ ] Backup y restauración de datos

## 🛡️ Resolución de Problemas

### La tablet no es reconocida
- Limpiar caché del navegador
- Verificar que JavaScript esté habilitado
- Probar en modo incógnito

### Error al conectar con Supabase
- Verificar las variables de entorno
- Comprobar conexión a internet
- Revisar que el proyecto de Supabase esté activo

### Catador no encontrado
- Verificar que el email esté registrado en la base de datos
- Comprobar que el catador esté activo
- Contactar al administrador

## 👥 Soporte

Para soporte técnico o dudas sobre el sistema, contactar al equipo de desarrollo.
