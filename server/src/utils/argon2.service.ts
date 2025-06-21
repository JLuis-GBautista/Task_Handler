import { hash, verify } from 'argon2';

export async function encryptPassword(password: string): Promise<string> {
  return await hash(password);
}

export async function verifyPassword(
  password: string,
  hashValue: string,
): Promise<boolean> {
  return await verify(hashValue, password);
}