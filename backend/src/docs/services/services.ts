import { OpenAPIV3 } from 'openapi-types';

const servicePath: OpenAPIV3.PathsObject = {
  '/service': {
    post: {
      security: [{ bearerAuth: [] }],
      tags: ['Service'],
      summary: 'Create a new service',
      operationId: 'createService',
      requestBody: {
        description: 'Service data',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                serviceName: { type: 'string' },
                durations: {
                  type: 'array',
                  items: { type: 'number' },
                  minItems: 1,
                },
                cost: { type: 'number' },
                category: { type: 'string' },
                location: { type: 'string' },
                workingHours: {
                  type: 'object',
                  properties: {
                    startHour: { type: 'number' },
                    startMinute: { type: 'number' },
                    endHour: { type: 'number' },
                    endMinute: { type: 'number' },
                  },
                  required: [
                    'startHour',
                    'startMinute',
                    'endHour',
                    'endMinute',
                  ],
                },
                serviceDays: { type: 'array', items: { type: 'string' } },
                serviceDescription: { type: 'string'}
              },
              required: [
                'serviceName',
                'durations',
                'cost',
                'category',
                'location',
                'workingHours',
                'serviceDays',
              ],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Service created successfully',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
        '400': { description: 'Bad request' },
        '401': { description: 'Unauthorized' },
        '500': { description: 'Internal server error' },
      },
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Service'],
      summary: 'Get all services',
      operationId: 'getServices',
      responses: {
        '200': {
          description: 'Services fetched successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {},
              },
            },
          },
        },
        '401': { description: 'Unauthorized' },
        '500': { description: 'Internal server error' },
      },
    },
  },
  '/service/{id}': {
    put: {
      security: [{ bearerAuth: [] }],
      tags: ['Service'],
      summary: 'Update a service',
      operationId: 'updateService',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Service ID',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        description: 'Service data',
        required: true,
        content: {
          'application/json': {
            schema: {},
          },
        },
      },
      responses: {
        '200': {
          description: 'Service updated successfully',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
        '400': { description: 'Bad request' },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Service not found' },
        '500': { description: 'Internal server error' },
      },
    },
    delete: {
      security: [{ bearerAuth: [] }],
      tags: ['Service'],
      summary: 'Delete a service',
      operationId: 'deleteService',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Service ID',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': { description: 'Service deleted successfully' },
        '400': { description: 'Bad request' },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Service not found' },
        '500': { description: 'Internal server error' },
      },
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Service'],
      summary: 'Get a service',
      operationId: 'getService',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Service ID',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Service fetched successfully',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Service not found' },
        '500': { description: 'Internal server error' },
      },
    },
  },
};

export default servicePath;
