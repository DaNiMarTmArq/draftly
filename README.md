# Draftly ✍️

**Draftly** es un sencillo y potente servicio web que permite a autores crear, editar y gestionar sus publicaciones con facilidad.

## Características principales

- 📝 API RESTful para crear, editar y recuperar publicaciones de blog
- 🧑‍💻 Registro de autores para empezar a escribir en minutos
- 🗃️ Gestión de posts por autor: cada usuario controla su contenido
- 🔐 Sin Autentificación
- ⚡ Ideal como backend para aplicaciones de blogging personalizadas

## Cómo iniciar el proyecto

Sigue estos pasos para poner en marcha **Draftly** de forma local:

### 1. Clona el repositorio

```bash
git clone https://github.com/DaNiMarTmArq/draftly.git
cd draftly
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Copia el archivo `.env.example` como `.env` y completa los valores necesarios para la conexión a la base de datos:

```bash
cp .env.example .env
```

> 🛠️ Asegúrate de tener una base de datos MySQL en ejecución con los datos de acceso correspondientes.

### 4. Inicializa la base de datos

Ejecuta los scripts SQL del directorio `db` en tu base de datos para crear las tablas necesarias:

### 5. Compila el proyecto

```bash
npm run build
```

### 6. Inicia el servidor

```bash
npm start
```

El servidor se iniciará por defecto en `http://localhost:3000`.

---

Si prefieres trabajar en modo desarrollo con recompilación automática:

```bash
npm run dev
```
