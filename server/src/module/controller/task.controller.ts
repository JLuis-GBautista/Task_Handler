import { Request, Response } from "express";
import { errorHandler } from "../../utils/error.handler";
import { createTaskService, taskListService, editTaskService, deleteTaskService } from "../service/task.service";
import { StatusT, UpdateTask } from "../types/user.types";

export const listTask = async (req: Request, res: Response) => {
  const userId = req.payload?.userId;
  let select = req.query.select;
  select = select === '' ? undefined : select;
  try {
    const tasks = await taskListService(userId, select as StatusT);
    console.log(tasks)
    res.status(200).json(tasks);
    return;
  } catch (error) {
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export const createTask = async (req: Request, res: Response) => {
  const userId = req.payload?.userId;
  const body = req.body;
  try {
    body.idUser = userId;
    const task = await createTaskService(userId, body);
    res.status(201).json(task);
    return;
  } catch (error) {
    console.log(error)
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const userId = req.payload?.userId;
  const taskId: number = parseInt(req.params.taskId);
  const body = req.body as UpdateTask;
  try {
    const result = await editTaskService(userId, taskId, body);
    res.status(201).json(result);
    return;
  } catch (error) {
    console.log(error)
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.payload?.userId;
  const taskId: number = parseInt(req.params.taskId);
  try {
    const result = await deleteTaskService(userId, taskId);
    res.status(201).json(result);
    return;
  } catch (error) {
    console.log(error)
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}
