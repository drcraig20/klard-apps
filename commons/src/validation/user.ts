import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from '../types/user';

export function validateUser(data: unknown) {
  return UserSchema.safeParse(data);
}

export function validateCreateUser(data: unknown) {
  return CreateUserSchema.safeParse(data);
}

export function validateUpdateUser(data: unknown) {
  return UpdateUserSchema.safeParse(data);
}

export function parseUser(data: unknown) {
  return UserSchema.parse(data);
}

export function parseCreateUser(data: unknown) {
  return CreateUserSchema.parse(data);
}

export function parseUpdateUser(data: unknown) {
  return UpdateUserSchema.parse(data);
}
