import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import { useStage } from "@/pages/AuthPage/contexts/stage"
import { usePostRegisterMutation } from "@/utils/api/hooks/usePostRegisterMutation"
import { COOKIE } from "@/utils/constants"

interface RegisterForm {
  email: string
  login?: string
  password: string
  passwordConfirm: string
}

export const useRegisterForm = () => {
  const { setStage } = useStage()
  const registerForm = useForm<RegisterForm>({
    mode: "all",
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

        goToLogin()
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
