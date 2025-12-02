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
import { useRegisterForm } from "./hooks/useRegisterForm"

export const RegisterForm = () => {
  const { form, functions, state } = useRegisterForm()

  return (
    <AuthFormLayout
      link={
        <div className="flex items-center justify-center">
          Already has account?
          <Button type="button" variant="link" onClick={functions.goToLogin}>
            Sign in
          </Button>
        </div>
      }
      title="Create an account"
      description="Create a new account by filling out the form below"
      isLoading={state.isLoading}
      onSubmit={functions.onSubmit}
    >
      <Controller
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Login</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              placeholder="login"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
        name="login"
        control={form.control}
      />

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

      <Controller
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Password confirmation</FieldLabel>
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
        name="passwordConfirm"
        control={form.control}
      />

      <Button disabled={state.isLoading} type="submit">
        <LoaderSwap isLoading={state.isLoading}>Sign Up</LoaderSwap>
      </Button>

      <AuthButtonsContainer isLoading={state.isLoading} />
    </AuthFormLayout>
  )
}
