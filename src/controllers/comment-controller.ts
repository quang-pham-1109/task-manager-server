import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createComment, getCommentsByCardId } from '../services';

export const createCommentHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { CardId, Comment } = req.body;

    const comment = await createComment(CardId, Comment);
    if (comment) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Comment created successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getCommentsByCardIdHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { cardId } = req.params;

    const comments = await getCommentsByCardId(parseInt(cardId));
    if (!comments) {
      return res.status(StatusCodes.NOT_FOUND).json('No comments found');
    }

    return res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
