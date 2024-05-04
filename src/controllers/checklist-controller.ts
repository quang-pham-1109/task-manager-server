import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createCheckList,
  getCardById,
  getCheckListByCardId,
  getCheckListById,
  updateCheckListStatus,
} from '../services';

export const createCheckListHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { CardId, Title } = req.body;
    const card = await getCardById(CardId);
    if (!card) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Card not found' });
    }

    await createCheckList(CardId, Title);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Created Successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getCheckListByCardIdHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { cardId } = req.params;

    const card = await getCardById(Number(cardId));
    if (!card) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Card not found' });
    }

    const checklists = await getCheckListByCardId(Number(cardId));
    if (!checklists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Checklists not found' });
    }

    return res.status(StatusCodes.OK).json(checklists);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const updateCheckListStatusHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { checkListId } = req.params;
    const { Status } = req.body;

    const checkList = await getCheckListById(Number(checkListId));
    if (!checkList) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Checklist not found' });
    }

    await updateCheckListStatus(Number(checkListId), Status);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Checklist status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
