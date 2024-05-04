import { authRouter } from './auth-route';
import { boardRouter } from './board-route';
import { cardRouter } from './card-route';
import { listRouter } from './list-route';
import { commentRouter } from './comment-route';

import { Application } from 'express';

export const initRoutes = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/board', boardRouter);
  app.use('/list', listRouter);
  app.use('/card', cardRouter);
  app.use('/comment', commentRouter);
};
