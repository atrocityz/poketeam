import { Controller } from "react-hook-form"

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  LoaderSwap,
} from "@/components/ui"

import { AuthButtonsContainer } from "../AuthButtonsContainer/AuthButtonsContainer"
import { AuthFormLayout } from "../AuthFormLayout"
import { useLoginForm } from "./hooks/useLoginForm"

export const LoginForm = () => {
  const { functions, state, form } = useLoginForm()

  return (
    <AuthFormLayout
      link={
        <div className="flex items-center justify-center">
          Don&apos;t have an account?
          <Button type="button" variant="link" onClick={functions.goToRegister}>
            Sign up
          </Button>
        </div>
      }
      title="Login"
      description="Enter your email and password to login to your account"
      isLoading={state.isLoading}
      onSubmit={functions.onSubmit}
    >
      <Controller
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              placeholder="login@example.com"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
        name="email"
        control={form.control}
      />

      <Controller
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              type="password"
              placeholder="********"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
        name="password"
        control={form.control}
      />

      <Button disabled={state.isLoading} type="submit">
        <LoaderSwap isLoading={state.isLoading}>Sign In</LoaderSwap>
      </Button>

      <AuthButtonsContainer isLoading={state.isLoading} />
    </AuthFormLayout>
  )
}
