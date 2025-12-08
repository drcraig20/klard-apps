import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean(),
});

export const MagicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type MagicLinkInput = z.infer<typeof MagicLinkSchema>;

export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}

export function validateMagicLink(data: unknown) {
  return MagicLinkSchema.safeParse(data);
}
