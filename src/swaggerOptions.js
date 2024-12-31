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
        url: 'http://localhost:5001', // Local server
        description: 'Local Development Server',
      },
      {
        url: 'https://bus-booking-system-web-backend-production.up.railway.app', // Deployed server
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
module.exports = swaggerDocs;
