import { BadRequestJson, ServerErrorJson } from '../generic-responses';

export const CommentGetCardJson = {
  tags: ['Comment'],
  summary: 'Gets comments by card ID',
  description: 'Endpoint  to get comments by card ID',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'cardId',
      in: 'path',
      required: true,
      description: 'Card ID',
      schema: {
        type: 'number',
        example: '1',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Comments retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                CommentId: {
                  type: 'number',
                  example: '1',
                },
                CardId: {
                  type: 'number',
                  example: '1',
                },
                UserId: {
                  type: 'number',
                  example: '1',
                },
                Comment: {
                  type: 'string',
                  example: 'My comment',
                },
              },
            },
          },
        },
      },
    },
    '400': BadRequestJson,
    '500': ServerErrorJson,
  },
};
