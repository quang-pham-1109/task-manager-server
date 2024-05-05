import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createBoard,
  getBoardsByUserId,
  getBoardById,
  findUserById,
  updateBoardById,
  deleteBoardById,
  addMember,
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
    const boardId = Number(req.params.boardId);

    if (Number.isNaN(boardId)) {
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

export const updateBoardHandler = async (req: Request, res: Response) => {
  try {
    const boardId = Number(req.params.boardId);

    const { Title } = req.body;

    if (Number.isNaN(boardId) || Title === null) {
      console.log('Invalid input');
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const board = await getBoardById(boardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    const updatedBoard = await updateBoardById(boardId, Title);
    if (updatedBoard) {
      return res.status(StatusCodes.OK).json({ message: 'Board updated' });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const deleteBoardHandler = async (req: Request, res: Response) => {
  try {
    const boardId = Number(req.params.boardId);

    if (Number.isNaN(boardId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const board = await getBoardById(boardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    await deleteBoardById(boardId);
    return res.status(StatusCodes.OK).json({ message: 'Board deleted' });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const addMemberHandler = async (req: Request, res: Response) => {
  try {
    const boardId = Number(req.params.boardId);
    const userId = getUserIdFromToken(req);
    const { MemberId } = req.body;

    // Check input
    if (Number.isNaN(boardId) || MemberId === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    // Check if user is adding themselves
    if (userId === MemberId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Cannot add yourself' });
    }

    // Check if board exists
    const board = await getBoardById(boardId);
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    // Check if user exists
    const user = await findUserById(MemberId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    // Add member
    const boardMembers = await addMember(boardId, MemberId);
    if (!boardMembers) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to add member' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Member added successfully' });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
