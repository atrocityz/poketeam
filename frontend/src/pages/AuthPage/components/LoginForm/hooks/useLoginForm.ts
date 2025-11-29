import type { AxiosError } from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import type { ErrorResponse } from "@/../@types/auth"

import { useStage } from "@/pages/AuthPage/contexts/stage"
import { usePostLoginMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores/auth"

import type { LoginFormData } from "../schemas/loginFormSchema"

import { loginFormSchema } from "../schemas/loginFormSchema"

export const useLoginForm = () => {
  const { setStage } = useStage()
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const postLoginMutation = usePostLoginMutation({
    options: {
      onSuccess: (response) => {
        Cookies.set(COOKIE.ACCESS_TOKEN, response.data.accessToken)

        useAuthStore.setState({
          isLoggedIn: true,
          user: response.data.user,
        })
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        console.log(error.response?.data.message)
      },
    },
  })

  const goToRegister = () => setStage("register")

  const onSubmit = loginForm.handleSubmit((values) => {
    postLoginMutation.mutate({
      params: values,
    })
  })

  return {
    state: {
      isLoading: postLoginMutation.isPending,
    },
    functions: {
      onSubmit,
      goToRegister,
    },
    form: loginForm,
  }
}
