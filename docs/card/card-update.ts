import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const CardUpdateJson = {
  tags: ['Card'],
  summary: 'Update card',
  description: 'Endpoint to update card',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'cardId',
      in: 'path',
      description: 'Card id',
      required: true,
      schema: {
        type: 'number',
      },
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
              example: 'My card',
            },
            Description: {
              type: 'string',
              example: 'My card description',
            },
            DueDate: {
              type: 'date',
              example: '2022-01-01',
            },
            ReminderDate: {
              type: 'date',
              example: '2022-01-01',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Card updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Card updated successfully',
              },
            },
          },
        },
      },
    },
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
    '500': ServerErrorJson,
    '401': UnauthorizedJson,
  },
};
