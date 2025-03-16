import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import apiService from "../services/apiService";

class ApiController {
  async getUser(req: Request, res: Response): Promise<void> {
    const result = await apiService.getUser();
    res.status(StatusCodes.OK).json(result);
  }
}

export default new ApiController();
