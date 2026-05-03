# MARY — El Camino a Casa
## Juego pixel-art para Android

Un juego narrativo de plataformas en 5 niveles, inspirado en una historia de guerra y reencuentro.

---

## 📦 CONTENIDO DEL PROYECTO

```
MaryGame/
├── app/
│   ├── build.gradle                          ← config del módulo app
│   ├── proguard-rules.pro
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/marygame/app/
│       │   └── MainActivity.java             ← actividad principal
│       ├── res/
│       │   ├── layout/activity_main.xml      ← layout WebView
│       │   ├── values/{strings,colors,styles}.xml
│       │   └── mipmap-*/                     ← iconos (vacíos, ver paso 2)
│       └── assets/
│           ├── index.html                    ← MENÚ con selector de niveles
│           └── levels/
│               ├── nivel1.html               ← El Barrio
│               ├── nivel2.html               ← El Bosque
│               ├── nivel3.html               ← Vieja Fábrica
│               ├── nivel4.html               ← Ciudad Bajo Lluvia
│               └── nivel5.html               ← La Estación (final)
├── build.gradle                              ← config del proyecto
├── settings.gradle
├── gradle.properties
└── gradle/wrapper/gradle-wrapper.properties
```

---

## 🛠️ CÓMO COMPILAR — OPCIÓN 1: ANDROID STUDIO (recomendado)

### Requisitos
- **Android Studio** (Hedgehog 2023.1.1 o más nuevo) — descarga en https://developer.android.com/studio
- Android SDK con API 34 instalada
- JDK 17 (incluido con Android Studio)

### Pasos

1. **Descomprime el ZIP** en una carpeta sin espacios ni acentos
   (ej. `C:\Proyectos\MaryGame` o `~/AndroidStudioProjects/MaryGame`)

2. **Abre Android Studio** → `File` → `Open` → selecciona la carpeta `MaryGame`

3. Espera a que Gradle sincronice (1–5 minutos la primera vez)

4. **Generar iconos**: Click derecho en `app/src/main/res` → `New` → `Image Asset` →
   - Icon Type: `Launcher Icons (Adaptive and Legacy)`
   - Name: `ic_launcher`
   - Foreground: pon una imagen o el texto "M"
   - Click `Next` → `Finish`

5. **Conecta tu Android** por USB con depuración activada
   *(Ajustes → Acerca del teléfono → toca 7 veces "Número de compilación" → vuelve a Ajustes → Opciones de desarrollador → activa "Depuración USB")*

6. Click en el botón verde ▶ **Run 'app'**

7. La app se instalará y abrirá en tu teléfono

---

## 🛠️ CÓMO COMPILAR — OPCIÓN 2: APK SIN ANDROID STUDIO

Si no quieres instalar Android Studio (4 GB+), usa **GitHub Actions** o **Codemagic** gratis:

### Con GitHub (gratis, todo en la nube)

1. Crea cuenta en https://github.com
2. Crea un repositorio nuevo, sube el contenido del ZIP
3. Crea archivo `.github/workflows/build.yml`:

```yaml
name: Build APK
on: [push, workflow_dispatch]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - name: Build APK
        run: |
          chmod +x gradlew || true
          gradle wrapper
          ./gradlew assembleDebug
      - uses: actions/upload-artifact@v3
        with:
          name: MaryGame-debug.apk
          path: app/build/outputs/apk/debug/app-debug.apk
```

4. Ve a la pestaña **Actions** del repo → ejecuta el workflow → descarga el APK

---

## 📱 INSTALAR EL APK EN TU TELÉFONO

1. Transfiere `app-debug.apk` al teléfono (cable USB, WhatsApp, Drive…)
2. Abre el archivo en el explorador del teléfono
3. Si pide permiso, activa **"Permitir orígenes desconocidos"**
4. Toca **Instalar** → Listo

---

## 🎮 CÓMO JUGAR

Al abrir la app, verás un menú con los 5 niveles. Toca cualquiera para jugar.

### Controles (todos en pantalla)
- **◀ ▶** — moverse a izquierda/derecha
- **▼** — agacharse / deslizarse (nivel 1)
- **▲** (botón redondo) — saltar / soltar liana / avanzar diálogo

### Niveles
| # | Nombre | Mecánica nueva |
|---|--------|---------------|
| 1 | El Barrio | Saltos sobre cajas y huecos |
| 2 | El Bosque | Lianas para columpiarse, plataformas móviles |
| 3 | Vieja Fábrica | Cintas transportadoras, robots enemigos |
| 4 | Ciudad bajo Lluvia | Suelo resbaladizo, vehículos como plataformas |
| 5 | La Estación | Final narrativo — la carta del padre |

### Botón ATRÁS de Android
Vuelve al menú principal desde cualquier nivel.

---

## 🐛 SOLUCIÓN DE PROBLEMAS

**"Gradle sync failed"**
→ Verifica que tienes Java 17 y Android SDK 34 instalados.

**Pantalla en blanco al abrir**
→ Asegúrate de que la carpeta `app/src/main/assets/` tiene `index.html` y `levels/nivel*.html`.

**El juego se ve muy chico o no encaja**
→ El juego está diseñado en horizontal (landscape), debería rotarse solo. Si no, gira el teléfono manualmente.

**Los controles no responden al tacto**
→ Verifica que la app se ejecute en pantalla completa. Si tu teléfono tiene barra de gestos, deslízala fuera.

---

## ✦ SOBRE EL JUEGO

Mary recorre 5 escenarios de su vida buscando llegar a la estación, donde la espera la última carta de su padre, escrita desde la guerra antes de su muerte.

Es un juego corto, hecho para ser jugado de una sentada. La historia importa más que los puntos.

**Hecho con ❤ usando solo HTML5 Canvas y un WebView de Android.**

Sin internet, sin tracking, sin anuncios.
