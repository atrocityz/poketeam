import Cookies from "js-cookie"

import { useGetUserQuery, usePostLogoutMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"

export const useProfile = () => {
  const getUserQuery = useGetUserQuery()
  const postLogoutMutation = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
      },
    },
  })

  const onLogout = () => {
    postLogoutMutation.mutate({})
  }

  return {
    profile: getUserQuery.data?.data,
    isLoading: getUserQuery.isPending,
    onLogout,
  }
}
