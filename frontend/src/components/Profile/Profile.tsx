import Cookies from "js-cookie"

import { useGetUserQuery, usePostLogoutMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { useAuth } from "@/utils/contexts"
import { queryClient } from "@/utils/lib"

import { Button, Skeleton } from "../ui"

export const Profile = () => {
  const { setIsAuth } = useAuth()
  const getUserQuery = useGetUserQuery()
  const profile = getUserQuery.data?.data

  const postLogoutMutation = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
        queryClient.removeQueries()
      },
    },
  })

  if (!profile && !getUserQuery.isLoading) return

  const onLogout = () => {
    postLogoutMutation.mutate({})
    setIsAuth(false)
  }

  return getUserQuery.isLoading ? (
    <Skeleton className="h-12 w-[200px]" />
  ) : (
    <div>
      <div>{profile?.login}</div>
      <div>{profile?.email}</div>

      <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
