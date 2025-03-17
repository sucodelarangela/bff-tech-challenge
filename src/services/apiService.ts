import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { config } from "../config/env";
import * as I from "../types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.apiUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para tratar erros
    this.api.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: AxiosError): Promise<never> {
    const apiError: I.IApiError = {
      status: error.response?.status || 500,
      message: error.message,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }

  // Método genérico para formatação de respostas
  private formatResponse<T>(response: AxiosResponse): I.IApiResponse<T> {
    return {
      data: response.data.result,
      status: response.status,
      message: response.data.message,
    };
  }

  // Métodos para consumir a API
  async login(
    email: string,
    password: string
  ): Promise<I.IApiResponse<{ result: { token: string } }>> {
    const response = await this.api.post<{ result: { token: string } }>(
      "/user/auth",
      {
        email,
        password,
      }
    );
    return this.formatResponse<{ result: { token: string } }>(response);
  }

  async getUser(): Promise<I.IApiResponse<I.IUser[]>> {
    const response = await this.api.get<I.IUser[]>("/user");
    return this.formatResponse<I.IUser[]>(response);
  }

  async getAccount(token: string): Promise<I.IApiResponse<I.IAccount>> {
    const response = await this.api.get<I.IAccount>("/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return this.formatResponse<I.IAccount>(response);
  }

  async createTransaction(
    payload: Partial<I.ITransaction>,
    token: string
  ): Promise<I.IApiResponse<I.ITransaction>> {
    const response = await this.api.post<Partial<I.ITransaction>>(
      "/account/transaction",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return this.formatResponse<I.ITransaction>(response);
  }

  async getStatement(
    id: string,
    token: string
  ): Promise<I.IApiResponse<I.IAccount>> {
    const response = await this.api.get<I.IAccount>(
      `/account/${id}/statement`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return this.formatResponse<I.IAccount>(response);
  }
}

export default new ApiService();
