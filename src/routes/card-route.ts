import { Router } from 'express';
import { validate, verifyTokenFromHeader } from '../middleware';
import { cardSchema } from '../schemas';
import {
  createCardHandler,
  getCardsByListIdHandler,
  getCardByIdHandler,
  deleteCardHandler,
  updateCardByIdHandler,
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

cardRouter.put('/:cardId', verifyTokenFromHeader, updateCardByIdHandler);

cardRouter.delete('/:cardId', verifyTokenFromHeader, deleteCardHandler);

export { cardRouter };
