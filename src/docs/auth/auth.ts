import { OpenAPIV3 } from 'openapi-types';

const authPaths: OpenAPIV3.PathsObject = {
  '/auth/signup': {
    post: {
      tags: ['Auth'],
      summary: 'Sign up a new user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'username', 'password'],
              properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        '201': { description: 'User created successfully' },
        '409': { description: 'Email or username already exists' },
        '500': { description: 'Failed to send email' },
      },
    },
  },
  '/auth/verify/{token}': {
    get: {
      tags: ['Auth'],
      summary: 'Verify a user account',
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': { description: 'Account verified successfully' },
        '400': { description: 'Invalid verification token' },
      },
    },
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Log in a user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '200': { description: 'Logged in successfully' },
        '400': {
          description: 'User is not verified or invalid email or password',
        },
        '404': { description: 'User not found' },
      },
    },
  },
  '/auth/forgot-password': {
    post: {
      tags: ['Auth'],
      summary: 'Send password reset link',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Password reset link sent to your email address',
        },
        '404': { description: 'User not found' },
        '500': { description: 'Failed to send email' },
      },
    },
  },
  '/auth/reset-password/{token}': {
    put: {
      tags: ['Auth'],
      summary: 'Reset password',
      parameters: [
        {
          name: 'token',
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
              required: ['newPassword'],
              properties: {
                newPassword: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '200': { description: 'Password has been reset' },
        '400': {
          description: 'Password reset token is invalid or has expired',
        },
      },
    },
  },
};

export default authPaths;
