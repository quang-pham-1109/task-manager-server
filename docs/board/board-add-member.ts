import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const BoardAddMemberJson = {
  tags: ['Board'],
  summary: 'Add member to board',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Board ID',
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
            UserId: {
              type: 'number',
              example: 1,
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Member added successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Member added successfully',
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
