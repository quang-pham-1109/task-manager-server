import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByCardId,
  updateCommentById,
} from '../services';

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

export const updateCommentHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { commentId } = req.params;
    const { Comment } = req.body;

    const comment = await getCommentById(parseInt(commentId));
    if (!comment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Comment not found' });
    }

    const updatedComment = await updateCommentById(
      parseInt(commentId),
      Comment,
    );

    if (updatedComment) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Comment updated successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const deleteCommentHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { commentId } = req.params;

    const comment = await getCommentById(parseInt(commentId));
    if (!comment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Comment not found' });
    }

    const deletedComment = await deleteCommentById(parseInt(commentId));
    if (deletedComment) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Comment deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
