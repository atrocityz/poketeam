import { Loader } from "lucide-react"

import { Button, ErrorMessage } from "@/components/ui"

import { useRegisterForm } from "./hooks/useRegisterForm"

export const RegisterForm = () => {
  const { form, functions, state } = useRegisterForm()

  return (
    <form
      className="grid gap-2 rounded-lg border border-zinc-300 p-10"
      onSubmit={functions.onSubmit}
    >
      <h1>Register</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="login">Login</label>
        <input
          className="h-8 rounded-sm border border-zinc-300 p-4"
          id="login"
          type="text"
          {...form.register("login")}
        />
        {form.formState.errors.login && (
          <ErrorMessage>{form.formState.errors.login.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          required
          className="h-8 rounded-sm border border-zinc-300 p-4"
          id="email"
          type="email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <ErrorMessage>{form.formState.errors.email.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          required
          className="h-8 rounded-sm border border-zinc-300 p-4"
          id="password"
          type="password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <ErrorMessage>{form.formState.errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password-confirm">Password confirmation</label>
        <input
          required
          className="h-8 rounded-sm border border-zinc-300 p-4"
          id="password-confirm"
          type="password"
          {...form.register("passwordConfirm")}
        />
        {form.formState.errors.passwordConfirm && (
          <ErrorMessage>
            {form.formState.errors.passwordConfirm.message}
          </ErrorMessage>
        )}
      </div>

      <Button type="button" variant="link" onClick={functions.goToLogin}>
        Already has account?
      </Button>

      <Button disabled={state.isLoading} type="submit">
        {state.isLoading && <Loader className="animate-spin" />}
        Sign up
      </Button>
    </form>
  )
}
