import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import { listSchema } from '../schemas';
import {
  createListHandler,
  getListsByBoardIdHandler,
  getListByIdHandler,
} from '../controllers';

const listRouter = Router();

listRouter.post(
  '/',
  validate(listSchema),
  verifyTokenFromHeader,
  createListHandler,
);

listRouter.get(
  '/:boardId/board',
  verifyTokenFromHeader,
  getListsByBoardIdHandler,
);

listRouter.get('/:id', verifyTokenFromHeader, getListByIdHandler);

export { listRouter };
