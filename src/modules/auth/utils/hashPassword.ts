import { genSalt, hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  const salt = await genSalt();
  return hash(password, salt);
}
