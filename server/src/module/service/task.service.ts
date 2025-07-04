import HTTPError from "../../utils/HTTPError";
import TaskRepository from "../repositories/task.repository"
import { InsertTask, StatusT, UpdateTask } from "../types/user.types";

export const taskListService = async (userId: number | undefined, select?: StatusT) => {
  console.log(userId)
  if (!userId)
    throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
  else {
    return await TaskRepository.findManyByUserId(userId, select);}
}

export const createTaskService = async (userId: number | undefined, task: InsertTask) => {
    if (!userId)
    throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
  else {
    const taskQuery = await TaskRepository.insert(task);
    return await TaskRepository.findById(taskQuery.insertId);
  }
}


export const editTaskService = async (userId: number | undefined, taskId: number, task: UpdateTask) => {
    if (!userId)
    throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
  else {
    const taskQuery =  await TaskRepository.update(taskId, task);
    return await TaskRepository.findById(taskQuery[0].insertId);
  }
}

export const deleteTaskService = async (userId: number | undefined, taskId: number) => {
    if (!userId)
    throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
  else {
    const task = await TaskRepository.findById(taskId);
    const taskQuery = await TaskRepository.delete(taskId);
    return task;
  }
}