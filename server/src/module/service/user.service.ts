import { encryptPassword, verifyPassword } from "../../utils/argon2.service";
import HTTPError from "../../utils/HTTPError";
import JWT_Auth from "../../utils/jwt.service";
import UserRepository from "../repositories/user.repository";
import { InsertUser } from "../types/user.types";

export const loginService = async (email: string, password: string) => {
  const user = await UserRepository.findByEmailForLogin(email);
  if (!user)
    throw new HTTPError("Usuario no registrado", "Error desde el Cliente", 401);
  else if (!(await verifyPassword(password, user.password)))
    throw new HTTPError("Error de credenciales", "Error desde el Cliente", 401);
  else {
    const accessToken = JWT_Auth.generateToken(user.id);
    const refreshToken = JWT_Auth.generateRefreshToken(user.id);
    return {
      accessToken,
      refreshToken
    };
  }
}

export const registerService = async (body: InsertUser) => {
  body.password = await encryptPassword(body.password);
  const newUser = await UserRepository.insertUser(body);
  const accessToken = JWT_Auth.generateToken(newUser.id);
  const refreshToken = JWT_Auth.generateRefreshToken(newUser.id);
  return {
    accessToken,
    refreshToken
  }
}

export const refreshService = (userId: number) => {
  return JWT_Auth.generateToken(userId);
}