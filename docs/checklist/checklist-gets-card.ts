import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const CheckListGetsCard = {
  tags: ['Checklist'],
  summary: 'Get checklist by card',
  description: 'Endpoint to get checklist by card',
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
      description: 'Checklist found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              CheckListId: {
                type: 'number',
                example: 1,
              },
              CardId: {
                type: 'number',
                example: 1,
              },
              Title: {
                type: 'string',
                example: 'My checklist',
              },
              Status: {
                type: 'string',
                example: 'done',
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Card or Checklist not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Card or Checklist not found',
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
