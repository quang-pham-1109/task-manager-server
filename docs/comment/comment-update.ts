export const CommentUpdateJson = {
  tags: ['Comment'],
  summary: 'Update comment',
  description: 'Endpoint to update comment',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'commentId',
      in: 'path',
      description: 'Comment id',
      required: true,
      schema: {
        type: 'number',
        example: 1,
      },
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            Comment: {
              type: 'string',
              example: 'My comment',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Comment updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Comment updated successfully',
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Comment not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Comment not found',
              },
            },
          },
        },
      },
    },
  },
};
