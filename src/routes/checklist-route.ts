import { Router } from 'express';
import { validate, verifyTokenFromHeader } from '../middleware';
import {
  createCheckListHandler,
  getCheckListByCardIdHandler,
  updateCheckListStatusHandler,
} from '../controllers';
import { checkListSchema, updateCheckListStatusSchema } from '../schemas';

const checkListRouter = Router();

checkListRouter.post(
  '/',
  validate(checkListSchema),
  verifyTokenFromHeader,
  createCheckListHandler,
);

checkListRouter.put(
  '/:checkListId/status',
  validate(updateCheckListStatusSchema),
  verifyTokenFromHeader,
  updateCheckListStatusHandler,
);

checkListRouter.get(
  '/:cardId/card',
  verifyTokenFromHeader,
  getCheckListByCardIdHandler,
);

export { checkListRouter };
