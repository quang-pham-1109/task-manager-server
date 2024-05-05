import {
  BadRequestJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const CheckListUpdateJson = {
  tags: ['Checklist'],
  summary: 'Update checklist',
  description: 'Endpoint to update checklist',
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
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            Title: {
              type: 'string',
              example: 'My checklist',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Checklist updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Checklist updated successfully',
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
    '401': UnauthorizedJson,
    '400': BadRequestJson,
    '500': ServerErrorJson,
  },
};
