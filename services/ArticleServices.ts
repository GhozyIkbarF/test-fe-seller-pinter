import { IArticleSchema } from "@/schema/article";
import { axiosInstanceToken } from "@/lib/axios";
import { ArticlesResponse } from "@/features/User/Articles/type";
import { Article } from "@/features/User/Articles/type";


export const getArticles = async (
  page: number,
  limit: number,
  category: string,
  title: string,
  userId: string = ""
): Promise<ArticlesResponse> => {
  const response = await axiosInstanceToken.get("/articles", {
    params: {
      page,
      limit,
      category,
      title,
      userId,
    },
  }
  );
  return response.data;
};

export const getArticleById = async (id: string): Promise<Article> => {
  const response = await axiosInstanceToken.get(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (data: IArticleSchema): Promise<IArticleSchema> => {
  const response = await axiosInstanceToken.post<IArticleSchema>("/articles", data);
  return response.data;
};

export const updateArticle = async (id: string, data: IArticleSchema): Promise<IArticleSchema> => {
  const response = await axiosInstanceToken.put<IArticleSchema>(`/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string): Promise<void> => {
  await axiosInstanceToken.delete(`/articles/${id}`);
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstanceToken.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // asumsi return: { url: "https://..." }
};