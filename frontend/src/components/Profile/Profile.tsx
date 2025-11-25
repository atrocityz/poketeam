import type { User } from "@/../@types/auth"

interface ProfileProps {
  profile: User
}

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <div>
      <div>{profile.login}</div>
      <div>{profile.email}</div>
    </div>
  )
}
