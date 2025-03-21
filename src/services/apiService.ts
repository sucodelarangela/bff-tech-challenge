import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { config } from "../config/env";
import * as I from "../types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.apiUrl,
      timeout: 15000,
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

  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<I.IApiResponse<I.IUser>> {
    const response = await this.api.post<I.IUser>("/user", {
      username,
      email,
      password,
    });
    return this.formatResponse<I.IUser>(response);
  }

  async getUsers(): Promise<I.IApiResponse<I.IUser[]>> {
    const response = await this.api.get<I.IUser[]>("/user");
    return this.formatResponse<I.IUser[]>(response);
  }

  async getUser(id: string): Promise<I.IApiResponse<I.IUser>> {
    const response = await this.api.get<I.IUser>("/user");

    const formattedResponse = this.formatResponse<I.IUser>(response);
    let userData = formattedResponse.data;

    if (Array.isArray(userData)) {
      userData = userData.find((user) => user.id === id) || null;
    }

    const result: I.IApiResponse<I.IUser> = {
      data: userData,
      status: formattedResponse.status,
      message: userData ? formattedResponse.message : "Usuário não encontrado",
    };

    return result;
  }

  async getAccount(token: string): Promise<I.IApiResponse<I.IAccountData>> {
    const response = await this.api.get<I.IAccount>("/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedResponse = this.formatResponse<I.IAccount>(response);
    let accountData = formattedResponse.data.account;

    if (Array.isArray(accountData)) {
      accountData = accountData[0] || null;
    }

    const result: I.IApiResponse<I.IAccountData> = {
      data: accountData,
      status: formattedResponse.status,
      message: formattedResponse.message,
    };

    return result;
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

  async updateTransaction(
    payload: Partial<I.ITransaction>,
    transactionId: string,
    token: string
  ): Promise<I.IApiResponse<I.ITransaction>> {
    const response = await this.api.put<Partial<I.ITransaction>>(
      `/account/transaction/update/${transactionId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return this.formatResponse<I.ITransaction>(response);
  }

  async deleteTransaction(
    accountId: string,
    transactionId: string,
    token: string
  ): Promise<I.IApiResponse<I.IDeleteTransactionResponse>> {
    const response = await this.api.delete<I.IDeleteTransactionResponse>(
      `/account/transaction/delete?accountId=${accountId}&transactionId=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return this.formatResponse<I.IApiResponse<I.IDeleteTransactionResponse>>(
      response
    );
  }

  async getStatement(
    id: string,
    token: string
  ): Promise<I.IApiResponse<I.ITransaction[]>> {
    const response = await this.api.get<I.IAccount>(
      `/account/${id}/statement`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const formattedResponse = this.formatResponse<I.IAccount>(response);
    let statement = formattedResponse.data.transactions.reverse();

    const result: I.IApiResponse<I.ITransaction[]> = {
      data: statement,
      status: formattedResponse.status,
      message: formattedResponse.message,
    };

    return result;
  }

  async getLastTransactions(
    id: string,
    token: string
  ): Promise<I.IApiResponse<I.ITransaction[]>> {
    const response = await this.api.get<I.IAccount>(
      `/account/${id}/statement`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const formattedResponse = this.formatResponse<I.IAccount>(response);
    let transactions = formattedResponse.data.transactions
      .reverse()
      .slice(0, 3);

    const result: I.IApiResponse<I.ITransaction[]> = {
      data: transactions,
      status: formattedResponse.status,
      message: formattedResponse.message,
    };

    return result;
  }
}

export default new ApiService();
