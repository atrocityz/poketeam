import { Button, ErrorMessage } from "@/components/ui"

import { useLoginForm } from "./hooks/useLoginForm"

export const LoginForm = () => {
  const { functions, state, form } = useLoginForm()

  return (
    <form
      className="rounded-lg border border-zinc-300 p-8"
      onSubmit={(event) => {
        event.preventDefault()
        functions.onSubmit()
      }}
    >
      <fieldset className="grid gap-4" disabled={state.isLoading}>
        <h1 className="text-center text-2xl">Login</h1>

        <div className="grid gap-3 text-xl">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              required
              className="h-8 rounded-sm border border-zinc-300 p-2"
              id="email"
              type="email"
              autoComplete="email"
              {...form.register("email", {
                required: true,
              })}
            />
            {form.formState.errors.email && (
              <ErrorMessage>{form.formState.errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              required
              className="h-8 rounded-sm border border-zinc-300 p-2"
              id="password"
              minLength={6}
              type="password"
              {...form.register("password", {
                required: true,
              })}
            />
            {form.formState.errors.password && (
              <ErrorMessage>
                {form.formState.errors.password.message}
              </ErrorMessage>
            )}
          </div>
        </div>

        <Button type="button" variant="link" onClick={functions.goToRegister}>
          Need to create account?
        </Button>

        <Button disabled={state.isLoading} type="submit">
          Sign in
        </Button>
      </fieldset>
    </form>
  )
}
