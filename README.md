# ms-questionnaire

Este es el backend para **Papu Desarrollo Móvil**, desarrollado con **Nest.js** y **MongoDB** (usando Docker para la base de datos). Este backend incluye microservicios para la gestión de cuestionarios y respuestas.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Docker](https://www.docker.com/get-started) (para ejecutar MongoDB en un contenedor)
- [npm](https://www.npmjs.com/) (viene con Node.js)

## Instalación
```
npm install
```
## Configuración de MongoDB con Docker
  El proyecto usa MongoDB dentro de un contenedor Docker. Asegúrate de tener Docker instalado y ejecutando. Para configurar MongoDB, usa el archivo docker-compose.yml proporcionado.

  Comandos de Docker
  Para iniciar MongoDB en Docker, ejecuta el siguiente comando desde la raíz del proyecto:
```
docker-compose up -d
```
  Esto ejecutará MongoDB en el puerto 27017 de tu máquina local.
  
  Para verificar que MongoDB esté corriendo, puedes usar el siguiente comando:
```
docker ps
```
  Deberías ver el contenedor ms-questionnaire-mongodb en la lista.

## Ejecución de la aplicación
  Modo de desarrollo
  Para ejecutar la aplicación en modo de desarrollo (con recarga automática cuando cambian los archivos), usa el siguiente comando:
```
npm run start:dev
```
  Esto iniciará el servidor en http://localhost:3000.
  Modo de producción
  Para compilar y ejecutar la aplicación en modo de producción:
```
npm run build
npm run start
```
## Endpoints disponibles
## CRUD de Cuestionarios (Questionnaire)
  Crear un cuestionario: POST /questionnaire
  Obtener todos los cuestionarios: GET /questionnaire
  Obtener un cuestionario por ID: GET /questionnaire/{id}
  Actualizar un cuestionario: PUT /questionnaire/{id}
  Eliminar un cuestionario: DELETE /questionnaire/{id}
  Ejemplo para crear un cuestionario: 
```
curl -X POST http://localhost:3000/questionnaire \
-H "Content-Type: application/json" \
-d '{
  "title": "Mi primer cuestionario",
  "description": "Descripción del cuestionario",
  "questions": ["Pregunta 1", "Pregunta 2"]
}'
```
## CRUD de Respuestas (Answers)
  Crear respuestas para un cuestionario: POST /answers
  Obtener todas las respuestas: GET /answers
  Obtener una respuesta por ID: GET /answers/{id}
  Eliminar una respuesta: DELETE /answers/{id}
  Ejemplo para crear respuestas:
```
curl -X POST http://localhost:3000/answers \
-H "Content-Type: application/json" \
-d '{
  "questionnaireId": "id-del-cuestionario",
  "answers": ["Respuesta 1", "Respuesta 2"]
}'
```
