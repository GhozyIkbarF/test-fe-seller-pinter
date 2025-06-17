import axios from "axios";

import { BASE_URL } from "@/constants/config";
import { getCookie } from "./utils";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosInstanceToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie()}`,
  },
});
