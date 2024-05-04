import { z } from 'zod';

export const cardSchema = z.object({
  body: z.object({
    ListId: z.number(),
    Title: z.string(),
    DueDate: z.string().date(),
    ReminderDate: z.string().date(),
    Description: z.string(),
  }),
});
