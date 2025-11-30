import * as z from "zod"

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
    password: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be longer than 6 characters" })
      .max(128, { error: "Password must not be longer than 128 characters" }),
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
