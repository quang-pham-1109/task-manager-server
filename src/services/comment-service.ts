import { type Comments, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (CardId: number, Comment: string) => {
  const insert = `
    INSERT INTO "Comments" ("CardId", "Comment")
    VALUES (${CardId}, '${Comment}');
  `;

  const newComment = prisma.$executeRawUnsafe(insert);
  return newComment;
};

export const getCommentsByCardId = async (CardId: number) => {
  const query = `
    SELECT * FROM "Comments"
    WHERE "CardId" IN (
      SELECT "CardId" FROM "Cards" WHERE "CardId" = ${CardId}
    );
  `;

  const comments = prisma.$queryRawUnsafe<Comments[]>(query);
  return comments;
};
