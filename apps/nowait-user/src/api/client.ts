// api/client.ts
import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

export const authApi = axios.create({
  baseURL: `${API_URI}/v1`,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: `${API_URI}/v1`,
});