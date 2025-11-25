import { useGetUserQuery } from "@/utils/api/hooks"

export const ProfilePage = () => {
  const getUserQuery = useGetUserQuery()
  const profile = getUserQuery.data?.data

  return (
    <div>
      <div>{profile?.email}</div>
      <div>{profile?.login}</div>
    </div>
  )
}
