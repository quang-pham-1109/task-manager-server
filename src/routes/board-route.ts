import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import { boardSchema } from '../schemas';
import {
  createBoardHandler,
  getBoardsHandler,
  getBoardByIdHandler,
  updateBoardHandler,
  deleteBoardHandler,
} from '../controllers';

const boardRouter = Router();

boardRouter.post(
  '/',
  verifyTokenFromHeader,
  validate(boardSchema),
  createBoardHandler,
);

boardRouter.get('/', verifyTokenFromHeader, getBoardsHandler);

boardRouter.get('/:boardId', verifyTokenFromHeader, getBoardByIdHandler);

boardRouter.put(
  '/:boardId',
  validate(boardSchema),
  verifyTokenFromHeader,
  updateBoardHandler,
);

boardRouter.delete('/:boardId', verifyTokenFromHeader, deleteBoardHandler);

export { boardRouter };
