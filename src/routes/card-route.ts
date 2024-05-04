import { Router } from 'express';
import { validate, verifyTokenFromHeader } from '../middleware';
import { cardSchema } from '../schemas';
import {
  createCardHandler,
  getCardsByListIdHandler,
  getCardByIdHandler,
} from '../controllers';

const cardRouter = Router();

cardRouter.post(
  '/',
  validate(cardSchema),
  verifyTokenFromHeader,
  createCardHandler,
);

cardRouter.get(
  '/:listId/list',
  verifyTokenFromHeader,
  getCardsByListIdHandler,
);

cardRouter.get('/:cardId', verifyTokenFromHeader, getCardByIdHandler);

export { cardRouter };
