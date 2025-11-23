import { Button } from "./ui"
import { useProfile } from "./useProfile"

export const Profile = () => {
  const { functions, state } = useProfile()

  if (!state.isLoading && !state.profile) {
    return null
  }

  return (
    <div>
      <div>{state.profile?.login}</div>
      <div>{state.profile?.email}</div>
      <Button onClick={functions.onLogout}>Logout</Button>
    </div>
  )
}
