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
        url: process.env.SWAGGER_URL || 'http://localhost:5001/api-docs', // Use environment variable or fallback to localhost
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
  apis: ['./routes/**/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Log the Swagger URL being used
  console.log(
    `Swagger documentation available at ${
      process.env.SWAGGER_URL || 'http://localhost:5001/api-docs'
    }/api-docs`
  );
};
