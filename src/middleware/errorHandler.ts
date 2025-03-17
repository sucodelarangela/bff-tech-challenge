import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IApiError } from "../types";

export const errorHandler = (
  err: Error | IApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  if ("status" in err) {
    // API Error
    const apiError = err as IApiError;
    res.status(apiError.status).json({
      status: apiError.status,
      message: apiError.message,
      details: apiError.details,
    });
  } else {
    // Unexpected Error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Erro interno do servidor",
      details: err.message,
    });
  }
};
