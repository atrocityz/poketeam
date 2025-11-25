import type { ReactNode } from "react"

import Cookies from "js-cookie"
import { useMemo } from "react"

import { useGetUserQuery, usePostLogoutMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { queryClient } from "@/utils/lib"

import { AuthContext } from "./AuthContext"

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const getUserQuery = useGetUserQuery()
  const postLogoutMutation = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
        queryClient.removeQueries()
      },
    },
  })

  const user = getUserQuery.data?.data

  const onLogout = () => {
    postLogoutMutation.mutate({})
  }

  const value = useMemo(
    () => ({
      user,
      onLogout,
      isLoading: getUserQuery.isLoading,
    }),
    [user, getUserQuery.isLoading],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
