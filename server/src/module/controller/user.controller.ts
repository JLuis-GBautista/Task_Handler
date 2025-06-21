import { Request, Response } from "express";
import HTTPError from "../../utils/HTTPError";
import UserRepository from "../repositories/user.repository";
import { InsertUser } from "../types/user.types";
import ENV from "../../config/env";
import { loginService, refreshService, registerService } from "../service/user.service";
import { errorHandler } from "../../utils/error.handler";

export async function login(req: Request, res: Response): Promise<void> {
  const body = req.body as { email: string, password: string };
  try {
    const {accessToken, refreshToken} = await loginService(body.email, body.password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,        // Evita acceso desde JavaScript del navegador
      secure: ENV.ENVIRONMENT === "Producción",          // Solo se envía por HTTPS
      sameSite: ENV.ENVIRONMENT === "Producción" ? "strict" : "lax",    // Evita CSRF (ajusta según tu frontend)
      path: "/",             // Puedes limitarlo a rutas si deseas
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
    res.status(200).json({
      ok: true,
      accessToken,
    });
    return;
  } catch (error) {
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export async function register(req: Request, res: Response) {
  const body = req.body as InsertUser;
  try {
    const {accessToken, refreshToken} = await registerService(body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,        // Evita acceso desde JavaScript del navegador
      secure: ENV.ENVIRONMENT === "Producción",          // Solo se envía por HTTPS
      sameSite: ENV.ENVIRONMENT === "Producción" ? "strict" : "lax",    // Evita CSRF (ajusta según tu frontend)
      path: "/",             // Puedes limitarlo a rutas si deseas
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
    res.status(201).json({
      ok: true,
      accessToken,
    });
    return;
  } catch (error) {
    console.log(error);
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export function logout(_req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,        // Evita acceso desde JavaScript del navegador
      secure: ENV.ENVIRONMENT === "Producción",          // Solo se envía por HTTPS
      sameSite: ENV.ENVIRONMENT === "Producción" ? "strict" : "lax",    // Evita CSRF (ajusta según tu frontend)
      path: "/",             // Puedes limitarlo a rutas si deseas
    });
    res.status(200).json({ ok: true, message: 'Logout exitoso' });
    return;
  } catch (error) {
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export async function session(req: Request, res: Response) {
  const userId = req.payload?.userId;
  try {
    if (!userId)
      throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
    else {
      const user = UserRepository.findByIdForSession(userId);
      if (!user)
        throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
      else {
        res.status(200).json(user);
        return;
      }
    }
  } catch (error) {
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}

export async function refresh(req: Request, res: Response) {
  const userId = req.payload?.userId;
  try {
    if (!userId)
      throw new HTTPError("No hay registro de perfil", "Error del servidor", 401);
    else {
      const accessToken = refreshService(userId);
      res.status(200).json({ ok: true, accessToken });
      return;
    }
  } catch (error) {
    const {statusCode, typeError, message} = errorHandler(error);
    res.status(statusCode).json({ ok: false, typeError, message });
    return;
  }
}