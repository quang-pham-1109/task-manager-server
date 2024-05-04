import { type Boards, PrismaClient } from '@prisma/client';

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
