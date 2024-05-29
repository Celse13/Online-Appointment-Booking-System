import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';
import allPaths from './paths';
import servers from './server';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Appointment Booking',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from MongoDB.',
    contact: {
      name: 'Appointment',
      email: 'onlinebooking573@gmail.com',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
    },
    ...servers,
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

  paths: allPaths,
};
const options = {
  swaggerDefinition,
  apis: ['../routes/*.ts', '../routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
