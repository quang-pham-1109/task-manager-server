import {
  UnauthorizedJson,
  ServerErrorJson,
  NotFoundJson,
} from '../generic-responses';

export const BoardGetJson = {
  tags: ['Board'],
  summary: 'Get board by ID',
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
      description: 'Board retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              BoardId: {
                type: 'number',
                example: 1,
              },
              CreatedAt: {
                type: 'date',
                example: '2021-09-01T00:00:00Z',
              },
              Title: {
                type: 'string',
                example: 'My board',
              },
              UpdatedAt: {
                type: 'date',
                example: '2021-09-01T00:00:00Z',
              },
            },
          },
        },
      },
    },
    '404': NotFoundJson,
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
