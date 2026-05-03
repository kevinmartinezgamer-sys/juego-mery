# Changelog - Mary: El Camino a Casa

## Versión 1.1 - Actualización de Sonido y Menú

### ✨ Nuevas Características

#### 🔊 Sistema de Audio
- **Música de fondo**: Melodía ambiental durante el juego
- **Efectos de sonido**:
  - Salto (jump)
  - Recolección de monedas (coin)
  - Deslizamiento (slide)
  - Muerte (die)
  - Victoria (win)
- **Sonidos sintéticos**: Generados con Web Audio API (no requiere archivos externos)
- **Control de volumen**: Ajustable desde el menú de opciones

#### 🎮 Menú Principal
- **Pantalla de inicio**: Menú principal con opciones
- **Navegación mejorada**: 
  - Jugar
  - Opciones
  - Créditos
- **Botón de salir**: En cada nivel para volver al menú

#### ⚙️ Menú de Opciones
- **Control de volumen**:
  - Volumen de música (0-100%)
  - Volumen de efectos de sonido (0-100%)
- **Esquemas de controles**:
  - Clásico: Flechas / WASD
  - Moderno: WASD / QWES
- **Tamaño de botones táctiles**: Ajustable (70-130%)
- **Persistencia**: Configuración guardada en localStorage

#### 📜 Pantalla de Créditos
- Información del equipo de desarrollo
- Historia del juego
- Agradecimientos

### 🔧 Mejoras Técnicas
- **Integración de audio**: Sistema modular en `audio.js`
- **Configuración persistente**: localStorage para guardar preferencias
- **Navegación fluida**: Sistema de páginas HTML interconectadas
- **Optimización**: Código JavaScript comprimido para mejor rendimiento

### 📁 Archivos Nuevos
```
app/src/main/assets/
├── menu.html          # Menú principal
├── options.html       # Pantalla de opciones
├── credits.html       # Pantalla de créditos
└── audio.js          # Sistema de audio
```

### 🎯 Archivos Modificados
- `MainActivity.java`: Ahora carga `menu.html` en lugar de `index.html`
- `index.html`: Agregado botón para volver al menú
- `levels/nivel1.html`: Integración completa del sistema de audio

### 🎨 Características de Audio
El sistema de audio utiliza Web Audio API para generar sonidos sintéticos:
- **Ventajas**:
  - No requiere archivos de audio externos
  - Tamaño de app reducido
  - Sonidos generados en tiempo real
  - Compatible con todos los navegadores modernos

### 🎮 Controles Personalizables
Los jugadores pueden elegir entre dos esquemas:
1. **Clásico**: 
   - Izquierda: ◀ / A
   - Derecha: ▶ / D
   - Saltar: ▲ / W / ESPACIO
   - Deslizar: ▼ / S

2. **Moderno**:
   - Izquierda: A / Q
   - Derecha: D / E
   - Saltar: W / ESPACIO
   - Deslizar: S / CTRL

### 📱 Mejoras de UX
- Botones táctiles con tamaño ajustable
- Feedback visual al presionar botones
- Transiciones suaves entre pantallas
- Configuración intuitiva y accesible

### 🐛 Correcciones
- Mejorada la detección de colisiones
- Optimizado el sistema de partículas
- Corregidos errores de navegación
- Mejorada la respuesta táctil

---

**Nota**: Esta actualización mantiene la compatibilidad con la versión anterior. Los jugadores que actualicen mantendrán su progreso.
