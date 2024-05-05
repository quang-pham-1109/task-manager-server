export const CommentDeleteJson = {
  tags: ['Comment'],
  summary: 'Delete comment',
  description: 'Endpoint to delete comment',
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
  responses: {
    '200': {
      description: 'Comment deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Comment deleted successfully',
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
