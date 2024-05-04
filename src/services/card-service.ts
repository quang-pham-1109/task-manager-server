import { PrismaClient, type Cards } from '@prisma/client';

const prism = new PrismaClient();

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

  const cards = await prism.$queryRawUnsafe<Cards[]>(insertCard);

  const newCardId = cards[0].CardId;
  const insertListCard = `
    INSERT INTO "ListCards" ("ListId", "CardId")
    VALUES (${ListId}, ${newCardId});
  `;

  const newListCard = await prism.$executeRawUnsafe(insertListCard);
  return newListCard;
};

export const getCardsByListId = async (listId: number) => {
  const query = `
    SELECT * FROM "Cards" 
    WHERE "CardId" IN (
      SELECT "CardId" FROM "ListCards" WHERE "ListId" = ${listId}
    );
  `;

  const cards = await prism.$queryRawUnsafe<Cards[]>(query);
  return cards;
};

export const getCardById = async (cardId: number) => {
  const query = `
    SELECT * FROM "Cards" WHERE "CardId" = ${cardId};
  `;

  const card = await prism.$queryRawUnsafe<Cards[]>(query);
  return card[0];
};
