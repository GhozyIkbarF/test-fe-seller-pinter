import { IUserLoginSchema, IUserSchema } from "@/schema/user";
import { axiosInstance } from "@/lib/axios";

export const loginUser = async (data: IUserLoginSchema): Promise<{ token: string }> => {
  const response = await axiosInstance.post<{ token: string }>("/auth/login", data);
  return response.data;
}

export const registerUser = async (data: IUserSchema) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
}