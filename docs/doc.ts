import { AuthLoginJson } from './auth/auth-login';
import { AuthRegisterJson } from './auth/auth-register';
import { BoardCreateJson, BoardGetJson, BoardGetsJson } from './board';
import { CardGetsListJson, CardCreateJson, CardGetJson } from './card';
import { CommentCreateJson, CommentGetCardJson } from './comment';
import {
  ListCreateJson,
  ListGetJson,
  ListGetsByBoardIdJson,
} from './list';

export const apiDoc = {
  openapi: '3.0.0',
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

    // Comment
    '/comment': {
      post: CommentCreateJson,
    },
    '/comment/{cardId}/card': {
      get: CommentGetCardJson,
    },
  },
};
