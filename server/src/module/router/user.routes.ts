import { Router } from "express";
import {login, session, refresh, register, logout} from "../controller/user.controller";
import validate from "../middlewares/validate.middleware";
import loginSchema from "../validation/login.validation";
import registerSchema from "../validation/register.validation";
import { authMiddleware, authRefreshMiddleware } from "../middlewares/jwt.middleware";

const userRoutes = Router();

userRoutes.post('/auth/login', validate(loginSchema), login);
userRoutes.post('/auth/register', validate(registerSchema), register);
userRoutes.get('/auth/refresh', authRefreshMiddleware, refresh);
userRoutes.get('/user/session', authMiddleware, session);
userRoutes.get('/auth/logout', logout);

export default userRoutes;