import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // validar JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token not found");
  }

  const [, token] = authHeader.split(" ");

  const { secret } = auth.jwt;
  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPaylod;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
}
