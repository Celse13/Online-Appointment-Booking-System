import { OpenAPIV3 } from 'openapi-types';

const appointmentControllerPath: OpenAPIV3.PathsObject = {
  '/appointments': {
    post: {
      summary: 'Create a new appointment',
      tags: ['Appointments'],
      security: [{ bearerAuth: [] }],
      description: 'Create a new appointment for a specific client.',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                date: { type: 'string', format: 'date-time' },
                time: { type: 'string' },
                serviceId: { type: 'string' },
              },
              required: ['date', 'time', 'serviceId'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Appointment created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  appointment: {
                    type: 'object',
                    properties: {
                      date: { type: 'string', format: 'date-time' },
                      time: { type: 'string' },
                      client: { type: 'string' },
                      service: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            cost: { type: 'number' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '404': {
          description: 'Client or Service not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default appointmentControllerPath;
