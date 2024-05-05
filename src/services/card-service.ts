import { PrismaClient, type Cards } from '@prisma/client';

const prisma = new PrismaClient();

export const createCard = async (
  Title: string,
  DueDate: Date,
  ReminderDate: Date,
  Description: string,
  ListId: number,
) => {
  const insertCard = `
    INSERT INTO "Cards" ("Title", "DueDate", "ReminderDate", "Description") 
    VALUES ('${Title}', '${DueDate}', '${ReminderDate}', '${Description}')
    RETURNING "CardId";
  `;

  const cards = await prisma.$queryRawUnsafe<Cards[]>(insertCard);

  const newCardId = cards[0].CardId;
  const insertListCard = `
    INSERT INTO "ListCards" ("ListId", "CardId")
    VALUES (${ListId}, ${newCardId});
  `;

  const newListCard = await prisma.$executeRawUnsafe(insertListCard);
  return newListCard;
};

export const getCardsByListId = async (listId: number) => {
  const query = `
    SELECT * FROM "Cards" 
    WHERE "CardId" IN (
      SELECT "CardId" FROM "ListCards" WHERE "ListId" = ${listId}
    );
  `;

  const cards = await prisma.$queryRawUnsafe<Cards[]>(query);
  return cards;
};

export const getCardById = async (cardId: number) => {
  const query = `
    SELECT * FROM "Cards" WHERE "CardId" = ${cardId};
  `;

  const card = await prisma.$queryRawUnsafe<Cards[]>(query);
  return card[0];
};

export const updateCardById = async (
  CardId: number,
  Title: string,
  DueDate: Date,
  ReminderDate: Date,
  Description: string,
) => {
  const update = `
    UPDATE "Cards" SET "Title" = '${Title}', "DueDate" = '${DueDate}', 
    "ReminderDate" = '${ReminderDate}', "Description" = '${Description}'
    WHERE "CardId" = ${CardId};
  `;

  const updatedCard = await prisma.$executeRawUnsafe(update);
  return updatedCard;
};

export const deleteCardById = async (CardId: number) => {
  // Delete comments associated with the card
  const queryComment = `
    DELETE FROM "Comments" WHERE "CardId" = ${CardId};
  `;
  await prisma.$executeRawUnsafe(queryComment);

  // Delete checklist associated with the card
  const queryChecklist = `
    DELETE FROM "CheckLists" WHERE "CardId" = ${CardId};
  `;
  await prisma.$executeRawUnsafe(queryChecklist);

  // Delete card
  const deleteQuery = `
    DELETE FROM "Cards" WHERE "CardId" = ${CardId};
  `;

  const deletedCard = await prisma.$executeRawUnsafe(deleteQuery);
  return deletedCard;
};
