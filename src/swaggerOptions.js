const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bus Management System API',
      version: '1.0.0',
      description: 'API documentation for the Bus Management System',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Local Development Server',
      },
      {
        url: 'https://bus-booking-system-web-backend-production.up.railway.app',
        description: 'Deployed Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], // Adjust the path to match your actual routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

console.log(swaggerDocs); // Debug log to check the generated spec
module.exports = swaggerDocs;
