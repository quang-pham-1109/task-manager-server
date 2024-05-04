import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createList,
  getListsByBoardId,
  getListById,
  getBoardById,
} from '../services';

export const createListHandler = async (req: Request, res: Response) => {
  try {
    const { Title, Order, BoardId } = req.body;

    if (Title === null || Order === null || BoardId === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const board = await getBoardById(BoardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    const lists = await getListsByBoardId(BoardId);
    if (lists.some((list) => list.Order === Order)) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Order already exists in the board' });
    }

    const list = await createList(Title, Order, BoardId);
    if (list) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Created Successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getListsByBoardIdHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const boardId: number = parseInt(req.params.boardId);

    const board = await getBoardById(boardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    const lists = await getListsByBoardId(boardId);
    if (!lists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'List Not found' });
    }

    return res.status(StatusCodes.OK).json(lists);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getListByIdHandler = async (req: Request, res: Response) => {
  try {
    const listId: number = parseInt(req.params.id);

    if (isNaN(listId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const list = await getListById(listId);
    if (!list) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Not found' });
    }

    return res.status(StatusCodes.OK).json(list);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
