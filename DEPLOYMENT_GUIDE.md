# 📱 GUÍA DE CONFIGURACIÓN DE TABLETS

## Para Android Tablets:
1. Instalar "Kiosk Browser" o "Fully Kiosk Browser"
2. Configurar URL: https://tu-app.netlify.app
3. Activar modo fullscreen
4. Bloquear orientación en horizontal
5. Deshabilitar botones de navegación

## Para iPad:
1. Abrir Safari
2. Ir a https://tu-app.netlify.app
3. Tocar "Compartir" → "Añadir a pantalla de inicio"
4. Activar "Acceso guiado" en Configuración → Accesibilidad
5. Iniciar Acceso guiado en la app

## Variables de Entorno (Supabase):
- VITE_SUPABASE_URL=tu_url_de_supabase
- VITE_SUPABASE_ANON_KEY=tu_clave_anonima

## URLs de Prueba:
- Desarrollo: http://localhost:5173
- Producción: https://tu-app.netlify.app

## Usuarios de Prueba:
- mesa1a@gmail.com / 123456
- mesa2a@gmail.com / 123456  
- mesa3a@gmail.com / 123456
- mesa4a@gmail.com / 123456
- mesa5a@gmail.com / 123456

## Troubleshooting:
- Si no reconoce tablet: Borrar localStorage y recargar
- Problemas de conexión: Verificar variables de entorno
- Layout incorrecto: Forzar landscape en configuración del navegador