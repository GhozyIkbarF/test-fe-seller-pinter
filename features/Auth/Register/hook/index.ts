"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type IUserSchema, UserSchema } from "@/schema/user";

export const useRegisterFeature = () => {
  const router = useRouter();

  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return {
    router,
    form,
  };
};
