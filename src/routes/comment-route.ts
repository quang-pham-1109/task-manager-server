import { Router } from 'express';
import { validate, verifyTokenFromHeader } from '../middleware';
import {
  createCommentHandler,
  getCommentsByCardIdHandler,
} from '../controllers';
import { commentSchema } from '../schemas';

const commentRouter = Router();

commentRouter.post(
  '/',
  validate(commentSchema),
  verifyTokenFromHeader,
  createCommentHandler,
);

commentRouter.get(
  '/:cardId/card',
  verifyTokenFromHeader,
  getCommentsByCardIdHandler,
);

export { commentRouter };
