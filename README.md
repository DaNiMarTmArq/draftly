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

Ejecuta los scripts SQL del directorio `db` en tu base de datos para crear las tablas necesarias. En "db/db_draftly_mock.sql" dispones de datos de prueba para construir la base de datos.

### 5. Compila el proyecto

```bash
npm run build
```

### 6. Inicia el servidor

```bash
npm start
```

El servidor se iniciará por defecto en `http://localhost:3000`.
En la ruta `/api-docs` dispones de la documentación Swagger con todas las rutas disponibles.

---

Si prefieres trabajar en modo desarrollo con recompilación automática:

```bash
npm run dev
```

## ⚙️ Detalles técnicos

Draftly ha sido desarrollado siguiendo principios de diseño modernos. Aquí se detallan algunos aspectos técnicos del proyecto:

### 🧱 Clean Architecture

El proyecto está estructurado siguiendo **Clean Architecture**, lo que asegura una separación clara de responsabilidades. Las principales capas son:

- **Domain**: contiene las entidades y reglas esenciales.
- **Application**: define los casos de uso y ejecuta la lógica principal.
- **API**: expone la interfaz HTTP mediante Express.
- **Persistence**: gestiona la interacción con la base de datos.

### 🐬 Base de datos con mysql2

El proyecto utiliza el paquete `mysql2` como driver para conectarse y realizar operaciones sobre una base de datos MySQL. La configuración se define a través de variables de entorno.

### 📘 Documentación con Swagger

Se incluye documentación de la API utilizando **Swagger**. Esto permite explorar y probar los endpoints de manera sencilla directamente desde la ruta `/api-docs`.

### ✅ Validación con Zod

Para validar los datos que envia el usuario, se utiliza la librería **Zod**, que permite definir esquemas de validación en TypeScript.
