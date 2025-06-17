// schemas/user.ts
import { z } from "zod"

export const UserSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
  role: z.enum(["Admin", "User"], {
    required_error: "Role is required",
  }),
})

export type IUserSchema = z.infer<typeof UserSchema>

export const UserLoginSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
})

export type IUserLoginSchema = z.infer<typeof UserLoginSchema>
