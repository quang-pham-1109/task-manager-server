import { PrismaClient, type Lists } from '@prisma/client';

const prism = new PrismaClient();

export const createList = async (
  Title: string,
  Order: number,
  BoardId: number,
) => {
  const insertList = `
    INSERT INTO "Lists" ("Title", "Order") 
    VALUES ('${Title}', ${Order})
    RETURNING "ListId";
  `;

  const lists = await prism.$queryRawUnsafe<Lists[]>(insertList);

  const newListId = lists[0].ListId;
  const insertBoardList = `
    INSERT INTO "BoardLists" ("BoardId", "ListId") 
    VALUES (${BoardId}, ${newListId});
  `;

  const newBoardList = await prism.$executeRawUnsafe(insertBoardList);
  return newBoardList;
};

export const getListsByBoardId = async (boardId: number) => {
  const query = `
    SELECT * FROM "Lists" 
    WHERE "ListId" IN (
      SELECT "ListId" FROM "BoardLists" 
      WHERE "BoardId" IN (
        SELECT "BoardId" FROM "Boards" 
        WHERE "BoardId" = ${boardId}
      )
    );
  `;

  const lists = await prism.$queryRawUnsafe<Lists[]>(query);
  return lists;
};

export const getListById = async (listId: number) => {
  const query = `
    SELECT * FROM "Lists" 
    WHERE "ListId" = ${listId};
  `;

  const list = await prism.$queryRawUnsafe<Lists[]>(query);

  return list[0];
};
