import { getUserProfile, updateUserProfile } from "@/services/UserServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Optionally, you can refetch the user profile after updating
      // queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      console.error("An error occurred while updating the profile:", errorMessage.error);
    },
  });
};