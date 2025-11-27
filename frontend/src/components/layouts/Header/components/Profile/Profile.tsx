import { Skeleton } from "@/components/ui"
import { useGetUserQuery } from "@/utils/api/hooks"
import { cn } from "@/utils/lib"

interface ProfileProps {
  className?: string
}

export const Profile = ({ className }: ProfileProps) => {
  const getUserQuery = useGetUserQuery()
  const profile = getUserQuery.data?.data

  if (!profile && !getUserQuery.isLoading) return

  return getUserQuery.isLoading ? (
    <Skeleton className="h-12 w-[200px]" />
  ) : (
    <div className={cn("", className)}>{profile?.login}</div>
  )
}
