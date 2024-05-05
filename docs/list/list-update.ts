import {
  NotFoundJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const ListUpdateJson = {
  tags: ['List'],
  summary: 'Update list',
  description: 'Update list',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'listId',
      in: 'path',
      required: true,
      description: 'List ID',
      schema: {
        type: 'number',
        example: '1',
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
              example: 'My list',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'List updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'List updated successfully',
              },
            },
          },
        },
      },
    },
    '401': UnauthorizedJson,
    '404': NotFoundJson,
    '500': ServerErrorJson,
  },
};
