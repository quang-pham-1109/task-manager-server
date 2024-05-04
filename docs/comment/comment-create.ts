import {
  BadRequestJson,
  CreatedSuccessfullyJson,
  ServerErrorJson,
} from '../generic-responses';

export const CommentCreateJson = {
  tags: ['Comment'],
  summary: 'Creates a comment',
  description: 'Endpoint to create a comment',
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
            CardId: {
              type: 'number',
              example: '1',
            },
            Comment: {
              type: 'string',
              example: 'My comment',
            },
          },
        },
      },
    },
  },
  responses: {
    '201': CreatedSuccessfullyJson,
    '400': BadRequestJson,
    '500': ServerErrorJson,
  },
};
