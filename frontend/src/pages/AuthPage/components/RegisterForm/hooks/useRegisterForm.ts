import type { AxiosError } from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import type { ErrorResponse } from "@/../@types/auth"

import { useStage } from "@/pages/AuthPage/contexts/stage"
import { usePostRegisterMutation } from "@/utils/api/hooks/usePostRegisterMutation"
import { COOKIE } from "@/utils/constants"

import type { RegisterFormData } from "../schemas/registerFormSchema"

import { registerFormSchema } from "../schemas/registerFormSchema"

export const useRegisterForm = () => {
  const { setStage } = useStage()
  const registerForm = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(registerFormSchema),
  })

  const goToLogin = () => setStage("login")

  const postRegisterMutation = usePostRegisterMutation({
    options: {
      onSuccess: ({ data }) => {
        const { accessToken } = data

        Cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {
          domain: "localhost",
          sameSite: "strict",
          expires: new Date(Date.now() + 15 * 60 * 1000),
        })

        // goToLogin()
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        console.log(error.response?.data.message)
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
