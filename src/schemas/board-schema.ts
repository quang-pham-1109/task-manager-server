import { z } from 'zod';

export const boardSchema = z.object({
  body: z.object({
    Title: z.string().min(2),
  }),
});

export const addMemberSchema = z.object({
  body: z.object({
    MemberId: z.number(),
  }),
});
