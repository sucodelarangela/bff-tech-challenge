export interface IApiError {
  status: number;
  message: string;
  details?: unknown;
}

export interface IApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface IAccount {
  account: IAccountData[];
  transactions: ITransaction[];
  cards: ICards[];
}

interface IAccountData {
  id: string;
  type: string;
  userId: string;
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

export interface ITransaction {
  id: string;
  accountId: string;
  type: string;
  value: number;
  date: string;
}
