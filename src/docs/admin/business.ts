import { OpenAPIV3 } from 'openapi-types';

const businessPath: OpenAPIV3.PathsObject = {
  '/business': {
    post: {
      summary: 'Create a new business',
      tags: ['Business'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                businessType: { type: 'string' },
                workingHours: { 
                  type: 'object',
                  properties: {
                    startHour: { type: 'string' },
                    endHour: { type: 'string' },
                  },
                },
                workingDays: { 
                  type: 'array',
                  items: { type: 'string' },
                },
                businessAddress: { 
                  type: 'object',
                  properties: {
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zipCode: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Business created successfully',
          content: {
            'application/json': {
              schema: {
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
      },
    },
    get: {
      summary: 'Get a business by ID',
      tags: ['Business'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'A successful response',
          content: {
            'application/json': {
            },
          },
        },
        '404': {
          description: 'Business not found',
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
    put: {
      summary: 'Update a business by ID',
      tags: ['Business'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                businessType: { type: 'string' },
                workingHours: { 
                  type: 'object',
                  properties: {
                    startHour: { type: 'string' },
                    endHour: { type: 'string' },
                  },
                },
                workingDays: { 
                  type: 'array',
                  items: { type: 'string' },
                },
                businessAddress: { 
                  type: 'object',
                  properties: {
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zipCode: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Business updated successfully',
          content: {
            'application/json': {

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
          description: 'Business not found',
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
    delete: {
      summary: 'Delete a business by ID',
      tags: ['Business'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Business deleted successfully',
          content: {
            'application/json': {
            },
          },
        },
        '404': {
          description: 'Business not found',
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

export default businessPath;