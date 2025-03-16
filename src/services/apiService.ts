import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { config } from "../config/env";

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

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
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
  async getUser(): Promise<ApiResponse<User[]>> {
    const response = await this.api.get<User[]>("/user");
    return this.formatResponse<User[]>(response);
  }
}

export default new ApiService();
