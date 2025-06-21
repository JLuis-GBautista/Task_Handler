import { sql } from "drizzle-orm";
import { db } from "../../db";
import { InsertUser } from "../types/user.types";
import { users } from "../../db/schemas/public";

export default class UserRepository {
  static async findByEmailForLogin(email: string) {
    return await db.query.users.findFirst({
      columns: {
        id: true,
        password: true,
      },
      where: (users, { eq }) => eq(users.email, email),
    });
  }

  static async insertUser({name, email, password}: InsertUser) {
    return (await db.insert(users).values({
      name, email, password
    }))[0];
  }

  static async findByIdForSession(userId: number) {
    return await db.query.users.findFirst({
      columns: {
        password: false,
      },
      where: (user, {eq}) => eq(user.id, userId),
    });
  }
}