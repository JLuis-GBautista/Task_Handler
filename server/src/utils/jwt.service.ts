import jwt from "jsonwebtoken";
import ENV from "../config/env";

interface Payload {
    userId: number;
}

export default class JWT_Auth {
    static generateToken (id: number) {
      const caducidad = 60 * 15;
        const Payload: Payload = {
            userId: id,
        }
        const token = jwt.sign(Payload, ENV.ACCESS_TOKEN_SECRET, { expiresIn: caducidad });
        return token;
    }
    static generateRefreshToken (id: number) {
        const caducidad = 60 * 60 * 24 * 7;
        const Payload: Payload = {
            userId: id,
        }
        const token = jwt.sign(Payload, ENV.REFRESH_TOKEN_SECRET, { expiresIn: caducidad });
        return token;
    }
    static validateToken (token: string) {
        token = token.split(" ")[1];
        return jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as Payload;
    }
    static validateRefreshToken (token: string) {
        return jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as Payload;
    }
}