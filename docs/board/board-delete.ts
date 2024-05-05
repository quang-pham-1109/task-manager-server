import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const BoardDeleteJson = {
  tags: ['Board'],
  summary: 'Delete board by ID',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'boardId',
      in: 'path',
      description: 'Board ID',
      required: true,
      schema: {
        type: 'number',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Board deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Board deleted successfully',
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Board not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Board not found',
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
