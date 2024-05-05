import { AuthLoginJson } from './auth/auth-login';
import { AuthRegisterJson } from './auth/auth-register';
import {
  BoardAddMemberJson,
  BoardCreateJson,
  BoardGetJson,
  BoardGetsJson,
  BoardUpdateJson,
  BoardDeleteJson,
} from './board';
import {
  CardGetsListJson,
  CardCreateJson,
  CardGetJson,
  CardUpdateJson,
  CardDeleteJson,
} from './card';
import {
  CheckListCreateJson,
  CheckListDeleteJson,
  CheckListGetsCard,
  CheckListUpdateJson,
  CheckListUpdateStatusJson,
} from './checklist';
import {
  CommentCreateJson,
  CommentDeleteJson,
  CommentGetCardJson,
  CommentUpdateJson,
} from './comment';
import {
  ListCreateJson,
  ListDeleteJson,
  ListGetJson,
  ListGetsByBoardIdJson,
  ListUpdateJson,
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
    '/board/{boardId}': {
      get: BoardGetJson,
      put: BoardUpdateJson,
      delete: BoardDeleteJson,
    },
    '/board/{boardId}/member': {
      post: BoardAddMemberJson,
    },

    // List
    '/list': {
      post: ListCreateJson,
    },
    '/list/{boardId}/board': {
      get: ListGetsByBoardIdJson,
    },
    '/list/{listId}': {
      get: ListGetJson,
      put: ListUpdateJson,
      delete: ListDeleteJson,
    },

    // Card
    '/card': {
      post: CardCreateJson,
    },
    '/card/{cardId}': {
      get: CardGetJson,
      put: CardUpdateJson,
      delete: CardDeleteJson,
    },
    '/card/{listId}/list': {
      get: CardGetsListJson,
    },

    // CheckList
    '/checklist': {
      post: CheckListCreateJson,
    },
    '/checklist/{checkListId}': {
      put: CheckListUpdateJson,
      delete: CheckListDeleteJson,
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
    '/comment/{commentId}': {
      put: CommentUpdateJson,
      delete: CommentDeleteJson,
    },
  },
};
