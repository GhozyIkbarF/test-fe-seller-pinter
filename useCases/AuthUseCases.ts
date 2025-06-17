import { AxiosError } from 'axios';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser, loginUser } from "@/services/AuthServices";
import { setCookie } from "@/lib/utils";

export const useCreateAccount = ({ router }: { router: any }) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully", {
        description: "You can now login to your account",
      });
      router.push('/auth/login');
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful", {
        description: "You are now logged in",
      });
      setCookie(data.token);
      window.location.href = '/';
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};
