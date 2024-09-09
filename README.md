# ms-questionnaire

Este proyecto es un microservicio para la gestión de cuestionarios y respuestas, desarrollado con **Node.js**, **Express**, **TypeScript**, y **MongoDB**. El microservicio incluye CRUDs para **Questionnaire** y **Answers**.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (ya sea localmente o en la nube, como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [npm](https://www.npmjs.com/) (que viene con Node.js)

## Instalación
- cd ms-questionnaire
- npm install

Configura la conexión a MongoDB:

En el archivo src/database.ts, asegúrate de que el URI de MongoDB esté correctamente configurado. Si estás ejecutando MongoDB localmente, debería verse así:
- await mongoose.connect('mongodb://localhost:27017/mymongodb');
Uso
Iniciar el servidor
Para iniciar el servidor, usa el siguiente comando:
- npm start

Esto iniciará el servidor en http://localhost:5000 y conectará a la base de datos de MongoDB. Deberías ver en la consola:
- Server running on port 5000
- MongoDB connected

Endpoints disponibles
GET /api/questionnaires: Obtiene todos los cuestionarios.

POST /api/questionnaires: Crea un nuevo cuestionario.

GET /api/questionnaires/:id: Obtiene un cuestionario por ID.

PUT /api/questionnaires/:id: Actualiza un cuestionario por ID.

DELETE /api/questionnaires/:id: Elimina un cuestionario por ID.

GET /api/answers: Obtiene todas las respuestas.

POST /api/answers: Crea una nueva respuesta.

GET /api/answers/:id: Obtiene una respuesta por ID.

PUT /api/answers/:id: Actualiza una respuesta por ID.

DELETE /api/answers/:id: Elimina una respuesta por ID.

Ejemplos de solicitudes
GET todos los cuestionarios:
- GET http://localhost:5000/api/questionnaires
  
POST un nuevo cuestionario:
- POST http://localhost:5000/api/questionnaires
Body (JSON):
{
  "title": "Cuestionario 1",
  "description": "Este es un cuestionario de ejemplo."
}

GET un cuestionario por ID:
- GET http://localhost:5000/api/questionnaires/613b2b8c9f1f4b001c9e22b0

Estructura del Proyecto

ms-questionnaire/
│
├── src/
│   ├── controllers/         # Controladores para la lógica de negocio
│   │   ├── questionnaireController.ts
│   │   └── answersController.ts
│   ├── models/              # Modelos de datos para MongoDB
│   │   ├── questionnaire.ts
│   │   └── answers.ts
│   ├── routes/              # Rutas de la API
│   │   ├── questionnaireRoutes.ts
│   │   └── answersRoutes.ts
│   ├── app.ts               # Configuración principal del servidor Express
│   └── database.ts          # Conexión a la base de datos MongoDB
│
├── package.json             # Configuración del proyecto y dependencias
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Este archivo

Tecnologías utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express: Framework web minimalista para Node.js.
TypeScript: Superconjunto de JavaScript que añade tipos estáticos.
MongoDB: Base de datos NoSQL para almacenar los datos de los cuestionarios y respuestas.
Mongoose: Biblioteca de modelado de objetos para MongoDB y Node.js.
