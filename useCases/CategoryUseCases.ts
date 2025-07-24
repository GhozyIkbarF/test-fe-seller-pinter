import { AxiosError } from "axios";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoriesOption,
} from "@/services/CategoryServices";
import { ICategorySchema } from "@/schema/category";
import { useQueryClient } from "@tanstack/react-query";


export const useGetCategories = (
    page: number = 1,
    limit: number,
    search: string = ""
) => {
    return useQuery({
    queryKey: ["categories", page, limit, search],
    queryFn: () => getCategories(page, limit, search),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
          toast.success("Category created successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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

export const useUpdateCategory = (id:string) => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: (data: ICategorySchema) =>
      updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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

export const useGetCategoriesOption = (
    // page: number = 1,
    // limit: number,
    search: string = ""
) => {
    return useQuery({
    queryKey: ["categoriesOptions", search],
    queryFn: () => getCategoriesOption(search),
  });
};

type UseGetInfiniteCategoriesParams = {
  limit: number;
  search?: string;
};

export const useGetInfiniteCategories = ({
  limit,
  search = "",
}: UseGetInfiniteCategoriesParams) => {
  return useInfiniteQuery({
    queryKey: ["categories", 10, search],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCategories(pageParam, 10, search),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, 
  });
};
