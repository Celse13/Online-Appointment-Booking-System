import { OpenAPIV3 } from 'openapi-types';

const usersPaths: OpenAPIV3.PathsObject = {
  '/users': {
    get: {
      summary: 'Get all users',
      tags: ['Users'],
      security: [{ bearerAuth: []}],
      responses: {
        '200': {
          description: 'A list of users',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
  },
  '/users/{userId}': {
    get: {
      summary: 'Get a user by ID',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'A user object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        '400': {
          description: 'Invalid user ID',
        },
        '404': {
          description: 'User not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
    put: {
      summary: 'Update a user',
      tags: ['Users'],
      security: [{ bearerAuth: []}],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        '400': {
          description: 'Invalid user ID',
        },
        '404': {
          description: 'User not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
    delete: {
      summary: 'Delete a user',
      tags: ['Users'],
      security: [{ bearerAuth: []}],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'User deleted successfully',
        },
        '400': {
          description: 'Invalid user ID',
        },
        '404': {
          description: 'User not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
  },
};

export default usersPaths;
