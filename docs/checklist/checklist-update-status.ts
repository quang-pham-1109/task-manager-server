import {
  BadRequestJson,
  ServerErrorJson,
  UnauthorizedJson,
} from '../generic-responses';

export const CheckListUpdateStatusJson = {
  tags: ['Checklist'],
  summary: 'Update checklist status',
  description: 'Endpoint to update checklist status',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'checkListId',
      in: 'path',
      description: 'The Id of the checklist to update',
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
            Status: {
              type: 'string',
              example: 'true',
            },
          },
          required: ['Status'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Checklist status updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Checklist status updated successfully',
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
    '400': BadRequestJson,
    '401': UnauthorizedJson,
    '500': ServerErrorJson,
  },
};
