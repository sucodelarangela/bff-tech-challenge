import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { config } from "../config/env";

// TODO: Organizar/segregar interfaces
interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface IAccount {
  account: {
    id: string;
    type: string;
    userId: string;
  };
  transactions: [string];
  cards: ICards[];
}

interface ICards {
  id: string;
  accountId: string;
  type: string;
  is_blocked: boolean;
  number: string;
  dueDate: string;
  functions: string;
  cvc: string;
  paymentDate: null;
  name: string;
}

interface ITransaction {
  id: string;
  accountId: string;
  type: string;
  value: number;
  date: string;
}

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
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: error.message,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }

  // Método genérico para formatação de respostas
  private formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
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
  ): Promise<ApiResponse<{ result: { token: string } }>> {
    const response = await this.api.post<{ result: { token: string } }>(
      "/user/auth",
      {
        email,
        password,
      }
    );
    return this.formatResponse<{ result: { token: string } }>(response);
  }

  async getUser(): Promise<ApiResponse<User[]>> {
    const response = await this.api.get<User[]>("/user");
    return this.formatResponse<User[]>(response);
  }

  async getAccount(token: string): Promise<ApiResponse<IAccount>> {
    const response = await this.api.get<IAccount>("/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return this.formatResponse<IAccount>(response);
  }

  async createTransaction(
    payload: Partial<ITransaction>,
    token: string
  ): Promise<ApiResponse<ITransaction>> {
    const response = await this.api.post<Partial<ITransaction>>(
      "/account/transaction",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return this.formatResponse<ITransaction>(response);
  }

  async getStatement(
    id: string,
    token: string
  ): Promise<ApiResponse<IAccount>> {
    const response = await this.api.get<IAccount>(`/account/${id}/statement`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return this.formatResponse<IAccount>(response);
  }
}

export default new ApiService();
