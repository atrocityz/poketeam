import Cookie from "js-cookie"
import { useNavigate } from "react-router"

import { useGetUserQuery, usePostLogoutMutation } from "@/utils/api/hooks"
import { routes } from "@/utils/config"
import { COOKIE } from "@/utils/constants"

export const useProfile = () => {
  const getUserQuery = useGetUserQuery()
  const navigate = useNavigate()
  const postLogoutMutation = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookie.remove(COOKIE.ACCESS_TOKEN)

        navigate(routes.auth.path)
      },
    },
  })

  const onLogout = () => {
    postLogoutMutation.mutate({})
  }

  return {
    state: {
      profile: getUserQuery.data?.data,
      isLoading: getUserQuery.isPending,
    },
    functions: {
      onLogout,
    },
  }
}
