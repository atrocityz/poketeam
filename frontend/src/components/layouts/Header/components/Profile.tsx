import { cn } from "@/utils/lib"
import { useAuthStore } from "@/utils/stores/auth"

interface ProfileProps {
  className?: string
}

export const Profile = ({ className }: ProfileProps) => {
  const user = useAuthStore((state) => state.user)

  return <div className={cn("", className)}>{user.login}</div>
}
