import { Router } from "express";
import { authMiddleware } from "../middlewares/jwt.middleware";
import { createTask, deleteTask, listTask, updateTask } from "../controller/task.controller";

const taskRoutes = Router();

taskRoutes.get('/user/tasks', authMiddleware, listTask);
taskRoutes.post('/user/task', authMiddleware, createTask);
taskRoutes.put('/user/task/:taskId', authMiddleware, updateTask);
taskRoutes.delete('/user/task/:taskId', authMiddleware, deleteTask);

export default taskRoutes;