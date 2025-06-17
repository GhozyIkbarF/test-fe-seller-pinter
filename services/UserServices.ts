import { IUserSchema } from "@/schema/user";
import { axiosInstanceToken } from "@/lib/axios";
import { IUserType } from "@/store/slices/authSlice";

export const getUserProfile = async (): Promise<IUserType> => {
  const response = await axiosInstanceToken.get("/auth/profile");
  return response.data;
};

export const updateUserProfile = async (data: IUserSchema): Promise<IUserSchema> => {
  const response = await axiosInstanceToken.put<IUserSchema>("/auth/profile", data);
  return response.data;
};

