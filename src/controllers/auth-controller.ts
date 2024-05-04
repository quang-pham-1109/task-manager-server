import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findUserByEmail, createUser } from '../services';
import { comparePassword, hashPassword, generateToken } from '../middleware';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    if (Email === null || Password === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const user = await findUserByEmail(Email);
    if (!user || user.Password === null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const isPasswordMatch = await comparePassword(Password, user.Password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.UserId);

    return res.status(StatusCodes.OK).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const user: Users = req.body;

    if (user.Email === null || user.Password === null) {
      return res.status(StatusCodes.BAD_REQUEST).json();
    }

    const existingUser = await findUserByEmail(user.Email);
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'User already exists' });
    }

    const password = await hashPassword(user.Password);

    await createUser({
      ...user,
      Password: password,
    });

    const token = generateToken(user.UserId);

    return res.status(StatusCodes.CREATED).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
