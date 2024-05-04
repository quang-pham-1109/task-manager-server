import { PrismaClient, type Users } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  const query = `
    SELECT * FROM "Users" 
    WHERE "Email" = '${email}';
  `;

  const users = await prisma.$queryRawUnsafe<Users[]>(query);
  return users[0];
};

export const createUser = async (user: Users) => {
  const query: string = `
    INSERT INTO "Users" ("FirstName", "LastName", "Email", "Password") 
    VALUES ('${user.FirstName}', '${user.LastName}', '${user.Email}', '${user.Password}');
  `;

  const newUser = await prisma.$executeRawUnsafe<Users[]>(query);
  return newUser;
};
