import {
  CreatedSuccessfullyJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const CardCreateJson = {
  tags: ['Card'],
  summary: 'Creates a new card',
  description: 'Endpoint to create a new card',
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
            ListId: {
              type: 'number',
              example: '1',
            },
            Title: {
              type: 'string',
              example: 'My card',
            },
            DueDate: {
              type: 'date',
              example: '2021-09-01',
            },
            ReminderDate: {
              type: 'date',
              example: '2021-08-01',
            },
            Description: {
              type: 'string',
              example: 'My card description',
            },
          },
          required: ['Title', 'ListId', 'Order'],
        },
      },
    },
  },
  responses: {
    '201': CreatedSuccessfullyJson,
    '404': {
      description: 'List not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'List not found',
              },
            },
          },
        },
      },
    },
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
