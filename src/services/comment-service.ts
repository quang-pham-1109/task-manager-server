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

export const getCommentById = async (CommentId: number) => {
  const query = `
    SELECT * FROM "Comments" WHERE "CommentId" = ${CommentId};
  `;

  const comment = await prisma.$queryRawUnsafe<Comments[]>(query);
  return comment[0];
};

export const updateCommentById = async (
  CommentId: number,
  Comment: string,
) => {
  const update = `
    UPDATE "Comments" SET "Comment" = '${Comment}'
    WHERE "CommentId" = ${CommentId};
  `;

  const updatedComment = prisma.$executeRawUnsafe(update);
  return updatedComment;
};

export const deleteCommentById = async (CommentId: number) => {
  const deleteQuery = `
    DELETE FROM "Comments"
    WHERE "CommentId" = ${CommentId};
  `;

  const deletedComment = prisma.$executeRawUnsafe(deleteQuery);
  return deletedComment;
};
