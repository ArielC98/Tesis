
# DESARROLLO DE UN SISTEMA PARA LA GESTIÓN ESTUDIANTIL DEL I.E.F MIGUEL DE SANTIAGO

## Desarrollo del componente móvil 📱



## Tecnologías ⚙️

- React JS
- Ionic / Capacitor
- Fetch API
- Android Studio
- GitHub
## Despliegue 

Para acceder a la aplicación móvil se debe descargar desde [Google Play Store](https://play.google.com/store/apps/details?id=epn.edu.gestionnotas).







## Manual de usuario 📖

El funcionamiento de la aplicación móvil está explicado en el siguiente video:
[Manual de usuario](https://www.youtube.com/watch?v=82di2yQK0e0)


## Instalación y modificación🛠️

Herramientas requeridas para proceder con la instalación:

- Git (Para la clonación del repositorio)
- Node.js 
- Android Studio

Para instalar el proyecto, se debe:

    1. Clonar el repositorio con el comando:

```bash
  git clone https://github.com/ArielC98/Tesis.git
```
    2. Dirigirse hacia la carpeta del repositorio clonado y ejectutar el siguiente comando:
```bash
  npm install
```
    3. Para verificar cualquier cambio en tiempo real se puede visualizar la aplicación en el navegador con el siguiente comando:
```bash
  npm start
```
    4. Para visualizar cambios en tiempo real en un dispositivo móvil primero se debe configurar el dispositivo en Android Studio siguiendo los pasos del siguiente enlace:
[Configurar un dispositivo físico en Android Studio](https://developer.android.com/studio/run/device?hl=es-419)

    5. Ejebutar el comando 

```bash
  ionic cap run adroid --livereload --external
```