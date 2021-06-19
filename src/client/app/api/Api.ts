import axios, { AxiosInstance } from 'axios';

export const Api: AxiosInstance = axios.create({
  baseURL: '/api/',
  validateStatus: (status) => status < 400,
});
