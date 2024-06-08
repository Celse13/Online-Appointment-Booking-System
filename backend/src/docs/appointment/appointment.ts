import { OpenAPIV3 } from 'openapi-types';

const appointmentControllerPath: OpenAPIV3.PathsObject = {
  '/client/appointments': {
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
    get: {
      summary: 'Get all appointments',
      tags: ['Appointments'],
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Appointments fetched successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  appointments: { type: 'array', items: { type: 'object' } },
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
    }
  },
  '/appointments/{id}/approve': {
    put: {
      summary: 'Approve an appointment',
      tags: ['Appointments'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the appointment to approve',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Appointment approved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  appointment: { type: 'object' },
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
  // New '/appointments/{id}/reject' PUT route documentation for rejectAppointment
  '/appointments/{id}/reject': {
    put: {
      summary: 'Reject an appointment',
      tags: ['Appointments'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the appointment to reject',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Appointment rejected successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  appointment: { type: 'object' },
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
  // New '/appointments' GET route documentation for getAppointments
  // New '/appointments/{id}' GET route documentation for getAppointment
  '/appointments/{id}': {
    get: {
      summary: 'Get a specific appointment',
      tags: ['Appointments'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the appointment to fetch',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Appointment fetched successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  appointment: { type: 'object' },
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
