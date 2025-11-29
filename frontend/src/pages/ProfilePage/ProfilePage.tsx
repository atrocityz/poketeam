import { useAuthStore } from "@/utils/stores"

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <div>{user.email}</div>
      <div>{user.login}</div>
    </div>
  )
}
