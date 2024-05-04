import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createBoard,
  getBoardsByUserId,
  getBoardById,
  findUserById,
} from '../services';
import { getUserIdFromToken } from '../middleware';

export const createBoardHandler = async (req: Request, res: Response) => {
  try {
    const { Title } = req.body;
    const userId = getUserIdFromToken(req);

    if (Title === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const board = await createBoard(Title, userId);
    if (board) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Board created' });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getBoardsHandler = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);

    const user = await findUserById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const boards = await getBoardsByUserId(userId);
    if (!boards) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Not found' });
    }

    return res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getBoardByIdHandler = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.id);

    if (isNaN(boardId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const board = await getBoardById(boardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Not found' });
    }

    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
