import { Router } from 'express';
import { validate, verifyTokenFromHeader } from '../middleware';
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentsByCardIdHandler,
  updateCommentHandler,
} from '../controllers';
import { commentSchema } from '../schemas';

const commentRouter = Router();

commentRouter.post(
  '/',
  validate(commentSchema),
  verifyTokenFromHeader,
  createCommentHandler,
);

commentRouter.put(
  '/:commentId',
  verifyTokenFromHeader,
  updateCommentHandler,
);

commentRouter.delete(
  '/:commentId',
  verifyTokenFromHeader,
  deleteCommentHandler,
);

commentRouter.get(
  '/:cardId/card',
  verifyTokenFromHeader,
  getCommentsByCardIdHandler,
);

export { commentRouter };
