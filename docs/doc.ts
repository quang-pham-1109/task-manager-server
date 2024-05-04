import { AuthLoginJson } from './auth/auth-login';
import { AuthRegisterJson } from './auth/auth-register';
import { BoardCreateJson, BoardGetJson, BoardGetsJson } from './board';
import { CardGetsListJson, CardCreateJson, CardGetJson } from './card';
import {
  CheckListCreateJson,
  CheckListGetsCard,
  CheckListUpdateStatusJson,
} from './checklist';
import { CommentCreateJson, CommentGetCardJson } from './comment';
import {
  ListCreateJson,
  ListGetJson,
  ListGetsByBoardIdJson,
} from './list';

export const apiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management API',
    description: 'API for Task Management Application',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3001/',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    // Auth
    '/auth/register': AuthRegisterJson,
    '/auth/login': AuthLoginJson,

    // Board
    '/board': {
      post: BoardCreateJson,
      get: BoardGetsJson,
    },
    '/board/{id}': {
      get: BoardGetJson,
    },

    // List
    '/list': {
      post: ListCreateJson,
    },
    '/list/{boardId}/board': {
      get: ListGetsByBoardIdJson,
    },
    '/list/{id}': {
      get: ListGetJson,
    },

    // Card
    '/card': {
      post: CardCreateJson,
    },
    '/card/{cardId}': {
      get: CardGetJson,
    },
    '/card/{listId}/list': {
      get: CardGetsListJson,
    },

    // CheckList
    '/checklist': {
      post: CheckListCreateJson,
    },
    '/checklist/{checkListId}/status': {
      put: CheckListUpdateStatusJson,
    },
    '/checklist/{cardId}/card': {
      get: CheckListGetsCard,
    },
    // Comment
    '/comment': {
      post: CommentCreateJson,
    },
    '/comment/{cardId}/card': {
      get: CommentGetCardJson,
    },
  },
};
