import { z } from 'zod';

export const boardSchema = z.object({
  body: z.object({
    Title: z.string().min(2),
  }),
});
