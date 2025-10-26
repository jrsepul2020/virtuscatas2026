# 🎨 Diseño Corporativo - Virtus Catas 2026

## 📐 Especificaciones Técnicas

### Dimensiones Fijas
- **Resolución:** 1200px × 800px (horizontal)
- **Orientación:** Landscape obligatoria
- **Zoom:** Deshabilitado
- **Scroll:** Controlado por componente

### 🎨 Paleta de Colores Corporativos

#### Colores Principales (#9B8658)
```css
--color-primary: #9B8658;        /* Dorado principal */
--color-primary-light: #B5A270;  /* Dorado claro */
--color-primary-lighter: #C9BE88; /* Dorado muy claro */
--color-primary-dark: #7A6B44;   /* Dorado oscuro */
--color-primary-darker: #5A4F32; /* Dorado muy oscuro */
```

#### Colores Secundarios (#3C542E)
```css
--color-secondary: #3C542E;        /* Verde principal */
--color-secondary-light: #516B40;  /* Verde claro */
--color-secondary-lighter: #668252; /* Verde muy claro */
--color-secondary-dark: #2A3B20;   /* Verde oscuro */
--color-secondary-darker: #1B2315; /* Verde muy oscuro */
```

#### Colores Neutros
```css
--color-white: #FFFFFF;
--color-gray-50: #F9FAFB;   /* Fondo muy claro */
--color-gray-100: #F3F4F6;  /* Fondo claro */
--color-gray-200: #E5E7EB;  /* Bordes */
--color-gray-300: #D1D5DB;  /* Bordes activos */
--color-gray-400: #9CA3AF;  /* Placeholder */
--color-gray-500: #6B7280;  /* Texto secundario */
--color-gray-600: #4B5563;  /* Texto */
--color-gray-700: #374151;  /* Texto principal */
--color-gray-800: #1F2937;  /* Títulos */
--color-gray-900: #111827;  /* Texto oscuro */
```

## 🖼️ Componentes Estilizados

### Header
- **Fondo:** Gradiente dorado (`--color-primary` → `--color-primary-dark`)
- **Altura:** 64px fija
- **Borde inferior:** 3px `--color-secondary`
- **Texto:** Blanco con sombra

### Dashboard
- **Layout:** Grid 2 columnas en horizontal
- **Gap:** 20px entre elementos
- **Altura:** Calc(800px - 64px - 40px) = 696px

### Cards
- **Fondo:** Blanco con gradiente sutil
- **Borde izquierdo:** 5px `--color-primary`
- **Borde superior:** 1px `--color-primary-lighter`
- **Sombra:** Corporativa con tonos dorados
- **Hover:** Elevación con `translateY(-2px)`

### Botones
- **Primarios:** Gradiente dorado con sombra
- **Secundarios:** Gradiente verde
- **Estados:** Hover con elevación y sombra
- **Disabled:** Grises neutros

### Login
- **Fondo:** Gradiente complejo (dorado → verde)
- **Card:** Blanco con borde dorado
- **Dimensiones:** Centrado en 1200×800px

## 📱 Responsive Design

### Orientación Portrait
- **Comportamiento:** Mensaje de rotación
- **Estilo:** Card dorada centrada
- **Texto:** "Gira la tablet a orientación horizontal"
- **App:** Oculta completamente (`display: none`)

### Pantallas Pequeñas (< 1200px)
- **Dashboard:** Una columna
- **Gap:** Reducido a 16px
- **Padding:** Ajustado a 16px

## 🔧 Optimizaciones Técnicas

### Performance
- **CSS Variables:** Todas los colores centralizados
- **Gradientes:** Uso estratégico para depth
- **Sombras:** Personalizadas con colores corporativos
- **Transiciones:** 0.3s ease para suavidad

### Accesibilidad
- **Contraste:** WCAG AA compliant
- **Focus:** Outline con colores corporativos
- **Font-size:** Mínimo 0.9rem para legibilidad
- **Touch targets:** Mínimo 44px para tablet

### UX Tablet
- **Touch-friendly:** Botones grandes (14px padding)
- **Gestos:** Zoom y context menu deshabilitados
- **Scroll:** Solo donde es necesario
- **Tap delay:** Eliminado

## 🎯 Componentes Específicos

### LoginAdapted
- **Dimensiones:** Máximo 600px ancho
- **Botones prueba:** Estilo secundario verde
- **Error messages:** Rojos con borde
- **Success states:** Verde secundario

### Dashboard Cards
- **Info Usuario:** Borde dorado principal
- **Admin Panel:** Borde verde secundario  
- **Success Card:** Fondo verde muy sutil
- **Instructions:** Fondo dorado muy sutil

### Header Navigation
- **Nav buttons:** Verde secundario
- **Active state:** Verde claro
- **Logout:** Verde oscuro
- **Hover:** Elevación sutil

## 📊 Métricas de Diseño

### Espaciado
- **Padding Cards:** 20px
- **Gap Dashboard:** 20px
- **Margin elementos:** 6-16px
- **Border radius:** 8-12px

### Tipografía
- **H1:** 1.8rem, peso 700
- **H2:** 1.6rem, peso 600  
- **H3:** 1.2rem, peso 600
- **Body:** 1rem, peso 400
- **Small:** 0.9rem, peso 400

### Sombras Corporativas
```css
--shadow-sm: 0 1px 2px 0 rgba(155, 134, 88, 0.1);
--shadow-md: 0 4px 6px -1px rgba(155, 134, 88, 0.15);
--shadow-lg: 0 10px 15px -3px rgba(155, 134, 88, 0.2);
--shadow-xl: 0 20px 25px -5px rgba(155, 134, 88, 0.25);
```

## ✅ Validación Visual

### Checklist de Diseño
- ✅ Colores corporativos implementados
- ✅ Dimensiones 1200×800 fijas
- ✅ Orientación horizontal forzada
- ✅ Gradientes dorados y verdes
- ✅ Sombras con tonos corporativos
- ✅ Botones con elevación y hover
- ✅ Cards con bordes corporativos
- ✅ Tipografía optimizada para tablet
- ✅ Espaciado consistente
- ✅ Estados interactivos suaves

La aplicación ahora refleja completamente la identidad visual corporativa con los colores #9B8658 y #3C542E, optimizada específicamente para tablets en orientación horizontal de 1200×800px.