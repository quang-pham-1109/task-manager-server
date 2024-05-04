export const CardGetsListJson = {
  tags: ['Card'],
  summary: 'Gets all cards of a list',
  description: 'Endpoint to get all cards of a list',
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
      description: 'Cards retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                CardId: {
                  type: 'number',
                  example: '1',
                },
                Title: {
                  type: 'string',
                  example: 'My card',
                },
                DueDate: {
                  type: 'date',
                  example: '2021-09-01',
                },
                ReminderDate: {
                  type: 'date',
                  example: '2021-08-01',
                },
                Description: {
                  type: 'string',
                  example: 'My card description',
                },
                ListId: {
                  type: 'number',
                  example: '1',
                },
                Order: {
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
      description: 'List not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'List not found',
              },
            },
          },
        },
      },
    },
  },
};
