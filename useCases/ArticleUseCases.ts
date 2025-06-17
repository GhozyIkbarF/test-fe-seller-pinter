import {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
} from "@/services/ArticleServices";
import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticlesResponse } from "@/features/User/Articles/type";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Article } from "@/features/User/Articles/type";

export const useGetArticles = (
  page: number = 1,
  limit: number,
  category: string = "",
  title: string = "",
  userId: string = ""
) => {
  return useQuery({
    queryKey: ["articles", page, limit, category, title, userId],
    queryFn: () => getArticles(page, limit, category, title, userId),
  });
};

export const useGetArticleById = (id: string, options?: Omit<UseQueryOptions<Article, Error, Article, [string, string]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Article, Error, Article, [string, string]>({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    enabled: !!id && (options?.enabled ?? true),
    ...options,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      toast.success("Article created successfully");
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateArticle(id, data),
    onSuccess: () => {
      toast.success("Article updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};

export const useDeleteArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: () => {
      toast.success("Article deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },

    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Upload berhasil!");
      console.log("Image URL:", data.url);
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};
