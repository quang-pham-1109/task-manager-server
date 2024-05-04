import { ServerErrorJson } from '../generic-responses';

export const CardGetJson = {
  tags: ['Card'],
  summary: 'Gets a card by ID',
  description: 'Endpoint to get a card by ID',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'cardId',
      in: 'path',
      required: true,
      description: 'Card ID',
      schema: {
        type: 'number',
        example: '1',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Card retrieved successfully',
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
              ListId: {
                type: 'number',
                example: '1',
              },
              Order: {
                type: 'number',
                example: '1',
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
  },
};
