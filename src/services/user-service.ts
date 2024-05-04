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

export const findUserById = async (id: number) => {
  const query = `
    SELECT * FROM "Users" 
    WHERE "UserId" = ${id};
  `;

  const user = await prisma.$queryRawUnsafe<Users[]>(query);
  return user[0];
};

export const createUser = async (user: Users) => {
  const query: string = `
    INSERT INTO "Users" ("FirstName", "LastName", "Email", "Password", "Username") 
    VALUES ('${user.FirstName}', '${user.LastName}', '${user.Email}', '${user.Password}', '${user.Username}');
  `;

  const newUser = await prisma.$executeRawUnsafe<Users[]>(query);
  return newUser;
};
