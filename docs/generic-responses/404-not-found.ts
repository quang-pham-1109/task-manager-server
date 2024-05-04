export const NotFoundJson = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Not Found',
          },
        },
      },
    },
  },
};
