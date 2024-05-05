import {
  NotFoundJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const ListDeleteJson = {
  tags: ['List'],
  summary: 'Delete list',
  description: 'Delete list',
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
  responses: {
    '200': {
      description: 'List deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'List deleted successfully',
              },
            },
          },
        },
      },
    },
  },
  '401': UnauthorizedJson,
  '404': NotFoundJson,
  '500': ServerErrorJson,
};
