import { z } from "zod"

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(128, { message: "Password must be no more than 128 characters" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one digit",
  })
  .refine((password) => /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password), {
    message: "Password must contain at least one special character",
  })

export const registerFormSchema = z
  .object({
    login: z
      .string()
      .max(32, { error: "Login must not be longer than 32 characters" })
      .optional(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ error: "Invalid email format" }),
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .min(6, { error: "Password confirm must be longer than 6 characters" })
      .max(128, {
        error: "Password confirm must not be longer than 128 characters",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>
