// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    req.token = authHeader.split(" ")[1];
    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message:
        "Acesso não autorizado. Token não fornecido ou formato inválido.",
      details: null,
    });
  }
};
