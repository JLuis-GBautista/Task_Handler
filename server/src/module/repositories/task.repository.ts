import { db } from "../../db";
import { InsertTask, StatusT, UpdateTask } from "../types/user.types";
import { tasks } from "../../db/schemas/public";
import { eq } from "drizzle-orm";

export default class TaskRepository {
  static async findManyByUserId(userId: number, select?: StatusT) {
    if (!select)
      return await db.query.tasks.findMany({
        where: (task, { eq }) => eq(task.idUser, userId)
      });
    else
      return await db.query.tasks.findMany({
        where: (task, { eq, and }) => and(
          eq(task.idUser, userId),
          eq(task.status, select),
        )
      });    
  }

  static async insert(task: InsertTask) {
    return (await db.insert(tasks).values(task));
  }

  static async update(taskId: number, task: UpdateTask) {
    return await db.update(tasks)
        .set(task)
        .where(eq(tasks.id, taskId)); 
  }

  static async delete(taskId: number) {
    return await db.delete(tasks).where(eq(tasks.id, taskId));
  }
}