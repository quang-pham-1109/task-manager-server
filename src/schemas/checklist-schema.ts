import { z } from 'zod';

export const checkListSchema = z.object({
  body: z.object({
    CardId: z.number(),
    Title: z.string(),
  }),
});

export const updateCheckListStatusSchema = z.object({
  body: z.object({
    Status: z.boolean(),
  }),
});
