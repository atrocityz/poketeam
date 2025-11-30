import type { AxiosError } from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { ErrorResponse } from "@/../@types/auth"

import { useStageStore } from "@/pages/AuthPage/stores"
import { usePostRegisterMutation } from "@/utils/api/hooks/usePostRegisterMutation"

import type { RegisterFormData } from "../schemas/registerFormSchema"

import { registerFormSchema } from "../schemas/registerFormSchema"

export const useRegisterForm = () => {
  const setStage = useStageStore((state) => state.setStage)
  const registerForm = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(registerFormSchema),
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const goToLogin = () => setStage("login")

  const postRegisterMutation = usePostRegisterMutation({
    options: {
      onSuccess: () => {
        goToLogin()
        toast.success("Account has been successfully registered")
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        toast.error(error.response?.data.message)
      },
    },
  })

  const onSubmit = registerForm.handleSubmit((values) => {
    const { passwordConfirm, ...otherValues } = values

    postRegisterMutation.mutate({
      params: otherValues,
    })
  })

  const password = registerForm.watch("password")

  return {
    form: registerForm,
    state: {
      isLoading: postRegisterMutation.isPending,
      password,
    },
    functions: {
      onSubmit,
      goToLogin,
    },
  }
}
