import { NextFunction, Request, Response } from "express";
import JWT_Auth from "../../utils/jwt.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("error");
    res.status(401).json({ ok: false, message: "Access token no proporcionado" });
    return;
  }

  try {
    const structToken = JWT_Auth.validateToken(authHeader);
    req.payload = structToken;
    console.log(req.payload);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ ok: false, message: "Tokens inválidos o expirados" });
    return;
  }
}

export function authRefreshMiddleware(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies?.refreshToken || "";
  try {
    const structToken = JWT_Auth.validateRefreshToken(refreshToken);
    req.payload = structToken;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ ok: false, message: "Refresh token invalido." });
    return;
  }
}