import type { AxiosError } from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useStageStore } from "@/pages/AuthPage/stores"
import { usePostLoginMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores/auth"

import type { ErrorResponse } from "../../../../../../@types/myApi"
import type { LoginFormData } from "../schemas/loginFormSchema"

import { loginFormSchema } from "../schemas/loginFormSchema"

export const useLoginForm = () => {
  const setStage = useStageStore((state) => state.setStage)
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const postLoginMutation = usePostLoginMutation({
    options: {
      onSuccess: (response) => {
        Cookies.set(COOKIE.ACCESS_TOKEN, response.data.accessToken)

        useAuthStore.setState({
          isLoggedIn: true,
          user: response.data.user,
        })

        toast.success("Successful login to account")
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
      submitError: postLoginMutation.error as AxiosError<ErrorResponse>,
    },
    functions: {
      onSubmit,
      goToRegister,
    },
    form: loginForm,
  }
}
