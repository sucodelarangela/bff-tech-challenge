import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import apiService from "../services/apiService";

class ApiController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await apiService.login(email, password);
    res.status(StatusCodes.OK).json(result);
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const result = await apiService.getUser();
    res.status(StatusCodes.OK).json(result);
  }

  async getAccount(req: Request, res: Response): Promise<void> {
    const token = req.token;
    const result = await apiService.getAccount(token!);
    res.status(StatusCodes.OK).json(result);
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    const token = req.token;
    const payload = {
      accountId: req.body.accountId,
      type: req.body.type,
      value: req.body.value,
    };
    const result = await apiService.createTransaction(payload, token!);
    res.status(StatusCodes.OK).json(result);
  }
}

export default new ApiController();
