import {
  BadRequestJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const ListGetsByBoardIdJson = {
  tags: ['List'],
  summary: 'Gets all lists of a board',
  description: 'Endpoint to get all lists of a board',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'boardId',
      in: 'path',
      required: true,
      description: 'The ID of the board to get lists from',
      schema: {
        type: 'number',
        example: '1',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Lists retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
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
    },
    '404': {
      description: 'Board or Lists not found in the system',
      content: {
        'application/json': {
          schema: {
            type: 'string',
            example: 'Board (or Lists) not found',
          },
        },
      },
    },
    '400': BadRequestJson,
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
