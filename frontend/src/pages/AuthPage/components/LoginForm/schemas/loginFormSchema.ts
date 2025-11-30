import * as z from "zod"

export const loginFormSchema = z.object({
  email: z
    .string({ error: "Email must be string" })
    .min(1, { message: "Email is required" })
    .email({ error: "Invalid email format" }),
  password: z
    .string({ error: "Password is required" })
    .min(6, { error: "Password must be longer than 6 characters" })
    .max(128, { error: "Password must not be longer than 128 characters" }),
})

export type LoginFormData = z.infer<typeof loginFormSchema>
