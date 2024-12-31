const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bus Management System API',
      version: '1.0.0',
      description: 'API documentation for the Bus Management System',
    },
    servers: [
      {
        url: 'http://localhost:5001', // Local development server
        description: 'Local Development Server',
      },
      {
        url: 'https://bus-booking-system-web-backend-production.up.railway.app', // Deployed server
        description: 'Deployed Production Server',
      },
    ],
  },
  apis: ['./routes/**/*.js'], // Adjust this to your API files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
