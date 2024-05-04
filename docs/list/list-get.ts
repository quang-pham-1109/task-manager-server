import {
  NotFoundJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const ListGetJson = {
  tags: ['List'],
  summary: 'Gets a list by ID',
  description: 'Endpoint to get a list by ID',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'List ID',
      schema: {
        type: 'number',
        example: '1',
      },
    },
  ],
  responses: {
    '200': {
      description: 'List retrieved successfully',
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
                example: 'My list',
              },
              Order: {
                type: 'number',
                example: '1',
              },
              BoardId: {
                type: 'number',
                example: '1',
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
