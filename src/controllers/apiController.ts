import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import apiService from "../services/apiService";

class ApiController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await apiService.login(email, password);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const result = await apiService.createUser(username, email, password);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await apiService.getUsers();
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      const result = await apiService.getUser(id);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req;
      const result = await apiService.getAccount(token!);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req;
      const { accountId, type, value } = req.body;
      const payload = { accountId, type, value };
      const result = await apiService.createTransaction(payload, token!);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req;
      const { transactionId } = req.params;
      const { accountId, type, value } = req.body;
      const payload = { transactionId, accountId, type, value };
      const result = await apiService.updateTransaction(
        payload,
        transactionId,
        token!
      );
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getStatement(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req;
      const { id } = req.params;
      const result = await apiService.getStatement(id, token!);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getLastTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req;
      const { id } = req.params;
      const result = await apiService.getLastTransactions(id, token!);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new ApiController();
