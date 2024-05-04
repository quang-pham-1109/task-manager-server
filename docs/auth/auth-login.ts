import { BadRequestJson, ServerErrorJson } from '../generic-responses';

export const AuthLoginJson = {
  post: {
    tags: ['Auth'],
    summary: 'Logs in a user and returns a token.',
    description: 'Endpoint to login the user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              Email: {
                type: 'string',
                example: 'test@gmail.com',
              },
              Password: {
                type: 'string',
                example: 'password123',
              },
            },
            required: ['Email', 'password'],
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'A JSON object containing the token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      '401': {
        description: 'Wrong password or email',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid credentials',
                },
              },
            },
          },
        },
      },
      '400': BadRequestJson,
      '500': ServerErrorJson,
    },
  },
};
