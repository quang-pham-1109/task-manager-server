import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    FirstName: z.string().min(2),
    LastName: z.string().min(2),
    Email: z.string().email(),
    Password: z.string().min(2),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    Email: z.string().email(),
    Password: z.string().min(2),
  }),
});
