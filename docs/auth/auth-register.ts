import { BadRequestJson } from '../generic-responses/400-bad-request';
import { ServerErrorJson } from '../generic-responses/500-server-error';

export const AuthRegisterJson = {
  post: {
    tags: ['Auth'],
    summary: 'Registers a new user.',
    description: 'To register a new user.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              FirstName: {
                type: 'string',
                example: 'John',
              },
              LastName: {
                type: 'string',
                example: 'Doe',
              },
              Username: {
                type: 'string',
                example: 'johndoe123',
              },
              Email: {
                type: 'string',
                example: 'test@gmail.com',
              },
              Password: {
                type: 'string',
                example: 'password123',
              },
            },
            required: ['FirstName', 'LastName', 'Email', 'Password'],
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'A JWT',
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
      '409': {
        description: 'Conflict',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Email already exists',
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
