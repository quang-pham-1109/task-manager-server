import { BadRequestJson, ServerErrorJson } from '../generic-responses';

export const CheckListDeleteJson = {
  tags: ['Checklist'],
  summary: 'Delete checklist',
  description: 'Endpoint to delete checklist',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'checkListId',
      in: 'path',
      description: 'Checklist id',
      required: true,
      schema: {
        type: 'number',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Checklist deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Checklist deleted successfully',
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Checklist not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Checklist not found',
              },
            },
          },
        },
      },
    },
  },
  '400': BadRequestJson,
  '500': ServerErrorJson,
};
