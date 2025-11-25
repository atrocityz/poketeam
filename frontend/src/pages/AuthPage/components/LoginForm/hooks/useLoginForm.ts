import type { AxiosError } from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import type { ErrorResponse } from "@/../@types/auth"

import { useStage } from "@/pages/AuthPage/contexts/stage"
import { usePostLoginMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { queryClient } from "@/utils/lib"

import type { LoginFormData } from "../schemas/loginFormSchema"

import { loginFormSchema } from "../schemas/loginFormSchema"

export const useLoginForm = () => {
  const navigate = useNavigate()
  const { setStage } = useStage()
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const postLoginMutation = usePostLoginMutation({
    options: {
      onSuccess: ({ data }) => {
        const { accessToken } = data

        Cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {
          domain: "localhost",
          sameSite: "strict",
          expires: new Date(Date.now() + 15 * 60 * 1000),
        })

        queryClient.refetchQueries({
          queryKey: ["getUser"],
        })

        navigate("/", {
          replace: true,
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
