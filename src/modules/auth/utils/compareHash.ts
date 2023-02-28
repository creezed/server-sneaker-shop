import { compare } from 'bcryptjs';

export async function compareHash(password: string, hashPassword: string) {
  return compare(password, hashPassword);
}
