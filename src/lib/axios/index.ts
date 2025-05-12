import axios from "axios";
import { AppConfig } from "../pinkcollar/config";

const api = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
