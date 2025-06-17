import { ICategorySchema } from "@/schema/category";
import { axiosInstanceToken } from "@/lib/axios";
import { CategoryResponse } from "@/types/category";

export const getCategories = async (page:number, limit:number, search:string): Promise<CategoryResponse> => {
  const response = await axiosInstanceToken.get("/categories", {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};
export const getCategoriesOption = async (search:string): Promise<CategoryResponse> => {
  const response = await axiosInstanceToken.get("/categories", {
    params: {
      search,
    },
  });
  return response.data;
};

export const getCategoryById = async (id: string): Promise<ICategorySchema> => {
  const response = await axiosInstanceToken.get<ICategorySchema>(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (data: ICategorySchema): Promise<ICategorySchema> => {
  const response = await axiosInstanceToken.post<ICategorySchema>("/categories", data);
  return response.data;
};

export const updateCategory = async (id: string, value: ICategorySchema): Promise<ICategorySchema> => {
  const response = await axiosInstanceToken.put<ICategorySchema>(`/categories/${id}`, value);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstanceToken.delete(`/categories/${id}`);
};