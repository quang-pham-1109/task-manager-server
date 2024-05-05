import { z } from 'zod';

export const listSchema = z.object({
  body: z.object({
    Title: z.string().min(1).max(255),
    BoardId: z.number(),
  }),
});
