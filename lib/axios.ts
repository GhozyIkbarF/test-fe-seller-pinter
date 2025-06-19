import axios from "axios";

import { BASE_URL } from "@/constants/config";
import { getCookie, removeCookie } from "./utils";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosInstanceToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie()}`,
  },
});

axiosInstanceToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeCookie(); 

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);