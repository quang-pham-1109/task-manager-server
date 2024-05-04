import {
  BadRequestJson,
  CreatedSuccessfullyJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const BoardCreateJson = {
  tags: ['Board'],
  summary: 'Creates a new board',
  description: 'Endpoint to create a new board',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            Title: {
              type: 'string',
              example: 'My board',
            },
          },
          required: ['Title'],
        },
      },
    },
  },
  responses: {
    '201': CreatedSuccessfullyJson,
    '400': BadRequestJson,
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
