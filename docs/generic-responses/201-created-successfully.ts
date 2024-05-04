export const CreatedSuccessfullyJson = {
  description: 'Created successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Created successfully',
          },
        },
      },
    },
  },
};
