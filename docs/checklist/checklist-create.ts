import {
  BadRequestJson,
  CreatedSuccessfullyJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const CheckListCreateJson = {
  tags: ['Checklist'],
  summary: 'Create a checklist',
  description: 'Endpoint to create a new checklist',
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
            Title: {
              type: 'string',
              example: 'My checklist',
            },
          },
          required: ['CardId', 'Title'],
        },
      },
    },
  },
  responses: {
    '201': CreatedSuccessfullyJson,
    '404': {
      description: 'Card not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Card not found',
              },
            },
          },
        },
      },
    },
    '400': BadRequestJson,
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
