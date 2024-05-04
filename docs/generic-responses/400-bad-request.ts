export const BadRequestJson = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid input',
          },
        },
      },
    },
  },
};
