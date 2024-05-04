import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import { boardSchema } from '../schemas';
import {
  createBoardHandler,
  getBoardsHandler,
  getBoardByIdHandler,
} from '../controllers';

const boardRouter = Router();

boardRouter.post(
  '/',
  verifyTokenFromHeader,
  validate(boardSchema),
  createBoardHandler,
);

boardRouter.get('/', verifyTokenFromHeader, getBoardsHandler);

boardRouter.get('/:id', verifyTokenFromHeader, getBoardByIdHandler);

export { boardRouter };
