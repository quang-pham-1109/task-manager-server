import { type CheckLists, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCheckList = async (CardId: number, Title: string) => {
  const insert = `
    INSERT INTO "CheckLists" ("CardId", "Title")
    VALUES (${CardId}, '${Title}');
  `;

  const newChecklist = await prisma.$executeRawUnsafe(insert);
  return newChecklist;
};

export const getCheckListByCardId = async (CardId: number) => {
  const query = `
    SELECT * FROM "CheckLists"
    WHERE "CardId" IN (
      SELECT "CardId" FROM "Cards" WHERE "CardId" = ${CardId}
    );
  `;

  const checklists = await prisma.$queryRawUnsafe(query);
  return checklists;
};

export const getCheckListById = async (CheckListId: number) => {
  const query = `
    SELECT * FROM "CheckLists" WHERE "CheckListId" = ${CheckListId};
  `;

  const checkList = await prisma.$queryRawUnsafe<CheckLists[]>(query);
  return checkList[0];
};

export const updateCheckListStatus = async (
  CheckListId: number,
  Status: string,
) => {
  const update = `
    UPDATE "CheckLists" SET "IsChecked" = '${Status}'
    WHERE "CheckListId" = ${CheckListId};
  `;

  const updatedCheckList = await prisma.$executeRawUnsafe(update);
  return updatedCheckList;
};

export const updateCheckListById = async (
  CheckListId: number,
  Title: string,
) => {
  const update = `
    UPDATE "CheckLists" SET "Title" = '${Title}'
    WHERE "CheckListId" = ${CheckListId};
  `;

  const updatedCheckList = await prisma.$executeRawUnsafe(update);
  return updatedCheckList;
};

export const deleteCheckListById = async (CheckListId: number) => {
  const query = `
    DELETE FROM "CheckLists"
    WHERE "CheckListId" = ${CheckListId};
  `;

  const deletedCheckList = await prisma.$executeRawUnsafe(query);
  return deletedCheckList;
};
