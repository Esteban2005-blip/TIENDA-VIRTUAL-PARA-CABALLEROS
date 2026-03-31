# CaballeroStyle - Tienda de Ropa para Caballeros

Sistema web interactivo de una tienda de ropa masculina, diseñado con enfoque en experiencia de usuario, accesibilidad, rendimiento y usabilidad.

## 📋 Descripción del Proyecto

CaballeroStyle es una plataforma e-commerce completa que ofrece una experiencia de compra moderna y accesible. El sitio presenta catálogo de productos, búsqueda avanzada, sistema de favoritos, carrito de compras funcional y formularios de contacto validados.

### Objetivo

Proporcionar a los clientes una experiencia de compra intuitiva, rápida y accesible, con diseño responsivo que funcione en cualquier dispositivo.

## 🎯 Requisitos Funcionales Implementados

### ✅ Visualización de Productos
- Catálogo completo con 16 productos
- Imagen, nombre, precio y descripción de cada producto
- Clasificación automática por 11 categorías (camisas, pantalones, zapatos, etc.)
- Sistema de selección de tallas (S, M, L, XL, XXL para prendas; 38-44 para zapatos)
- Productos destacados en sección de inicio

### ✅ Búsqueda y Filtros
- Barra de búsqueda en tiempo real por nombre de producto
- Filtro por categoría con búsqueda simultánea
- Visualización dinámica de resultados sin recarga de página
- Mensaje con información cuando no hay resultados

### ✅ Carrito de Compras
- Agregar productos con selección de talla
- Modificar cantidad de artículos
- Eliminar productos individuales
- Cálculo automático del total
- Contador dinámico en la navegación
- Validación de carrito antes de finalizar

### ✅ Sistema de Favoritos
- Agregar/remover favoritos con corazón interactivo
- Almacenamiento persistente en localStorage
- Destacados especiales en el inicio
- Sincronización entre vistas

### ✅ Carrito y Compra
- Formulario de compra con validación completa
- Campos: Nombre, Email, Dirección, Teléfono, Método de pago
- Validación de email y teléfono
- Modal seguro para confirmación
- Limpieza de carrito tras compra exitosa

### ✅ Formulario de Contacto
- Formulario completo con Nombre, Email, Asunto, Mensaje
- Validación de campos requeridos
- Validación de email automática
- Mensajes de error en tiempo real
- Retroalimentación tras envío exitoso

### ✅ Navegación
- Menú principal sticky en todas las páginas
- Enlaces internos suaves (smooth scroll)
- Navegación intuitiva con etiquetas claras
- Logo interactivo

## 🎨 Requisitos No Funcionales Implementados

### 📱 Responsividad
- **Desktop**: Optimizado para pantallas 1200px+
- **Tablet**: Adaptación automática 768px - 1199px
- **Mobile**: Diseño completo para 320px - 767px
- Grid fluido con auto-fit
- Navegación adaptable por dispositivo

### ⚡ Rendimiento
- Carga inicial rápida sin dependencias externas
- CSS minimalista y eficiente
- JavaScript sin bloques de renderizado
- Lazy-loading compatible para imágenes
- Animaciones suaves con GPU acceleration (transform, opacity)

### ♿ Accesibilidad
- Etiquetas ARIA en todos los elementos interactivos
- Skip-link para saltar al contenido
- Textos alternativos (alt) en todas las imágenes
- Contraste de colores WCAG AA compliant
- Navegación por teclado completamente funcional
- Lectores de pantalla soportados
- Roles semánticos HTML5
- aria-live para actualizaciones dinámicas
- Focus visible en todos los elementos interactivos

### 🔒 Seguridad
- Validación de formularios en cliente y servidor-ready
- Protección contra campos vacíos
- Validación de formato email
- Validación de formato teléfono
- Datos en localStorage (sin datos sensibles)
- Estructura segura sin dependencias potencialmente vulnerables

### 🎯 Usabilidad
- Botones grandes y fáciles de identificar
- Feedback visual inmediato (mensajes, cambios de color)
- Errores claramente indicados
- Contraste de colores optimizado
- Tipografía legible (Segoe UI)
- Espacios de blanco adecuados
- Jerarquía visual clara

### 🌐 Compatibilidad
- Chrome/Chromium (versiones modernas)
- Firefox (versiones modernas)
- Safari (versiones modernas)
- Edge (versiones modernas)
- Soporte mobile completo

## 📁 Estructura del Proyecto

```
.
├── index.html          # Página principal con estructura HTML
├── styles.css          # Estilos CSS responsivos y accesibles
├── app.js              # Lógica JavaScript principal
├── README.md           # Este archivo
├── img/                # Carpeta con imágenes del sitio
│   ├── banerprincipal1.png
│   ├── camisaclasica1.jpg
│   ├── pantalonslim1.jpg
│   └── ... (más imágenes de productos)
└── .github/
    └── copilot-instructions.md
```

## 🚀 Cómo Usar

### Instalación
1. Descarga o clona el proyecto
2. Abre `index.html` en un navegador web moderno
3. ¡Listo! La aplicación funciona sin necesidad de servidor

### Características de Uso

#### Navegar por Productos
1. Selecciona una categoría del filtro de tipos
2. Usa la barra de búsqueda para encontrar productos
3. La lista se actualiza en tiempo real

#### Comprar
1. Selecciona talla si aplica
2. Haz clic en "Agregar al carrito"
3. Ve a la sección Carrito
4. Modifica cantidades o elimina productos
5. Haz clic en "Finalizar compra"
6. Completa el formulario con tus datos
7. Confirma la compra

#### Favoritos
1. Haz clic en el corazón (❤) de cualquier producto
2. Se guardará automáticamente
3. Los favoritos persisten al recargar el sitio

#### Contacto
1. Ve a la sección Contacto
2. Completa el formulario con tu información
3. Se validará automáticamente
4. Recibe confirmación de envío

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Responsive design, flexbox, grid, animaciones
- **JavaScript (ES6+)**: Lógica interactiva sin dependencias
- **LocalStorage**: Persistencia de favoritos en cliente
- **Navegadores Modernos**: Soporta estándares web actuales

## 📊 Validaciones Implementadas

### Formulario de Compra
- ✅ Nombres no vacíos
- ✅ Email válido (regex)
- ✅ Dirección requerida
- ✅ Teléfono válido (mínimo 7 dígitos)
- ✅ Método de pago seleccionado

### Formulario de Contacto
- ✅ Nombre requerido
- ✅ Email válido
- ✅ Asunto requerido
- ✅ Mensaje con contenido
- ✅ Mensajes de error descriptivos

### Carrito
- ✅ Validación antes de comprar
- ✅ Cantidades positivas
- ✅ Control de talles
- ✅ Cálculo correcto de totales

## 🎨 Paleta de Colores

```
Principal: #1a2238 (Azul oscuro)
Secundario: #6b8cdb (Azul claro)
Acento: #ff6a3d (Naranja)
Fondo: #f4f4f4 (Gris claro)
Error: #d32f2f (Rojo)
Éxito: #388e3c (Verde)
Texto: #222 (Negro suave)
```

## 📱 Puntos de Quiebre Responsivos

```
Desktop:  1200px+  (Grid 4 columnas)
Tablet:   768-1199px (Grid 2-3 columnas)
Mobile:   320-767px  (Grid 1 columna)
```

## 🧪 Evaluación de Usabilidad

### Heurísticas de Nielsen Implementadas

1. **Visibilidad del estado del sistema**
   - Contador dinámico del carrito
   - Mensajes de feedback en tiempo real
   - Indicadores de favoritos

2. **Correspondencia entre el sistema y el mundo real**
   - Lenguaje familiar y claro
   - Iconografía intuitiva
   - Estructura lógica de secciones

3. **Control del usuario**
   - Botón cancelar siempre disponible
   - Posibilidad de modificar cantidad
   - Opción de remover del carrito

4. **Prevención de errores**
   - Validación preventiva de formularios
   - Confirmación antes de comprar
   - Mensajes de error descriptivos

5. **Flexibilidad y eficiencia**
   - Búsqueda rápida
   - Filtros por categoría
   - Acceso directo a secciones

6. **Estética y diseño**
   - Interfaz limpia y moderna
   - Colores coherentes
   - Espaciado adecuado

## 🔍 Recomendaciones de Mejora

1. **Backend Integration**
   - Conectar a base de datos real
   - Sistema de autenticación de usuarios
   - Procesamiento seguro de pagos

2. **Análisis de Datos**
   - Seguimiento de conversiones
   - Heatmaps de interacción
   - Análisis de comportamiento

3. **Funcionalidades Adicionales**
   - Historial de compras
   - Perfil de usuario
   - Sistema de reseñas
   - Chat de atención al cliente
   - Programas de lealtad

4. **Optimizaciones**
   - PWA (Progressive Web App)
   - Service Workers para offline
   - Compresión de imágenes
   - CDN para assets

## 📞 Contacto y Soporte

- **Email**: contacto@caballerostyle.com
- **Teléfono**: +593 (123) 456-7890
- **Ubicación**: Ecuador - Pastaza - Puyo, Vía Tarqui

## 📝 Notas de Desarrollo

- Todos los datos de productos están en `app.js`
- Los favoritos se guardan en `localStorage` con clave 'favoritos'
- Las imágenes deben ubicarse en la carpeta `img/`
- El sitio es completamente funcional sin servidor
- Compatible con todas las prácticas web modernas

## ✨ Características Especiales

- 🎯 Interfaz intuitiva sin curva de aprendizaje
- 🚀 Carga instantánea (sin dependencias externas)
- ♿ Totalmente accesible para usuarios con discapacidades
- 📱 Responsive design perfecto en cualquier dispositivo
- 🎨 Diseño moderno y profesional
- ⚡ Rendimiento optimizado
- 🔒 Datos seguros con validación completa

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**Versión**: 2.0  
**Última actualización**: Marzo 2026  
**Desarrollador**: CaballeroStyle Team
