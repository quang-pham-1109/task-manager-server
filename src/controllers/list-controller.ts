import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createList,
  getListsByBoardId,
  getListById,
  getBoardById,
  updateList,
  deleteListById,
} from '../services';

export const createListHandler = async (req: Request, res: Response) => {
  try {
    const { Title, BoardId } = req.body;

    if (Title === null || BoardId === null) {
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

    const list = await createList(Title, BoardId);
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
    const boardId: number = Number(req.params.boardId);

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
    const listId: number = Number(req.params.listId);

    if (Number.isNaN(listId)) {
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

export const updateListHandler = async (req: Request, res: Response) => {
  try {
    const listId: number = Number(req.params.listId);
    const { Title } = req.body;

    if (Number.isNaN(listId) || Title === null) {
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

    const updatedList = await updateList(listId, Title);
    if (!updatedList) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const deleteListHandler = async (req: Request, res: Response) => {
  try {
    const listId: number = Number(req.params.listId);

    if (Number.isNaN(listId)) {
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

    const deletedList = await deleteListById(listId);
    if (!deletedList) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
