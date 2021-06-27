import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export const Api: AxiosInstance = axios.create({
  baseURL: '/api/',
  validateStatus: (status) => status < 400,
});
