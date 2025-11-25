import { useAuth } from "@/utils/contexts/auth"

export const ProfilePage = () => {
  const { isLoading, user } = useAuth()

  if (!user && !isLoading) return null

  return (
    <div>
      <div>{user?.email}</div>
      <div>{user?.login}</div>
    </div>
  )
}
