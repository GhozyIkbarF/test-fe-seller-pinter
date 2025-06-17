import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, "Category field cannot be empty"),
})

export type ICategorySchema = z.infer<typeof categorySchema>