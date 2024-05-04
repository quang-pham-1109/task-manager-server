import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const BoardGetsJson = {
  tags: ['Board'],
  summary: 'Get boards by user ID',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Boards retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                BoardId: {
                  type: 'number',
                },
                Title: {
                  type: 'string',
                },
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
