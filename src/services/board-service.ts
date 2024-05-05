import { type Boards, PrismaClient, Lists } from '@prisma/client';
import { deleteListById } from './list-service';

const prisma = new PrismaClient();

export const createBoard = async (title: string, userId: number) => {
  const insertBoard = `
    INSERT INTO "Boards" ("Title") 
    VALUES ('${title}')
    RETURNING "BoardId";
  `;

  const boards = await prisma.$queryRawUnsafe<Boards[]>(insertBoard);

  const newBoardId = boards[0].BoardId;
  const insertBoardMember = `
    INSERT INTO "BoardMembers" ("BoardId", "MemberId") 
    VALUES (${newBoardId}, ${userId});
  `;

  const boardMembers = await prisma.$executeRawUnsafe(insertBoardMember);
  return boardMembers;
};

export const getBoardsByUserId = async (userId: number) => {
  const query = `
    SELECT * FROM "Boards"
    WHERE "BoardId" IN (
      SELECT "BoardId" FROM "BoardMembers"
      WHERE "MemberId" = ${userId}
    );
  `;
  const boards = await prisma.$queryRawUnsafe<Boards[]>(query);
  return boards;
};

export const getBoardById = async (boardId: number) => {
  const query = `
    SELECT * FROM "Boards"
    WHERE "BoardId" = ${boardId};
  `;
  const board = await prisma.$queryRawUnsafe<Boards[]>(query);
  return board[0];
};

export const updateBoardById = async (boardId: number, title: string) => {
  const query = `
    UPDATE "Boards"
    SET "Title" = '${title}'
    WHERE "BoardId" = ${boardId}
    RETURNING *;
  `;
  const updatedBoard = await prisma.$queryRawUnsafe<Boards[]>(query);
  return updatedBoard[0];
};

export const deleteBoardById = async (boardId: number) => {
  // Get all lists in the board
  const queryList = `
    SELECT "ListId" FROM "BoardLists"
    WHERE "BoardId" = ${boardId};
  `;
  const lists = await prisma.$queryRawUnsafe<Lists[]>(queryList);

  // Delete all lists in the board
  for (const list of lists) {
    await deleteListById(list.ListId);
  }

  // Delete board
  const queryBoard = `
    DELETE FROM "Boards"
    WHERE "BoardId" = ${boardId}
    RETURNING *;
  `;
  const deletedBoard = await prisma.$queryRawUnsafe<Boards[]>(queryBoard);
  return deletedBoard[0];
};

export const addMember = async (boardId: number, memberId: number) => {
  const query = `
    INSERT INTO "BoardMembers" ("BoardId", "MemberId")
    VALUES (${boardId}, ${memberId})
    RETURNING *;
  `;
  const boardMembers = await prisma.$queryRawUnsafe<Boards[]>(query);
  return boardMembers[0];
};
