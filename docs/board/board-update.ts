import { ServerErrorJson, UnauthorizedJson } from '../generic-responses';

export const BoardUpdateJson = {
  tags: ['Board'],
  summary: 'Update board by ID',
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
            Title: {
              type: 'string',
              example: 'My board',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Board updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Board updated successfully',
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
