import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const CardDeleteJson = {
  tags: ['Card'],
  summary: 'Delete card',
  description: 'Endpoint to delete card',
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
  responses: {
    '200': {
      description: 'Card deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Card deleted successfully',
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
  },
  '401': UnauthorizedJson,
  '500': ServerErrorJson,
};
