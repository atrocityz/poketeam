import Cookies from "js-cookie"
import { Link } from "react-router"

import { Button } from "@/components/ui"
import { usePostLogoutMutation } from "@/utils/api/hooks"
import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores/auth"

import { Navigation, Profile } from "./components"

export const Header = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const { mutate: logout, isPending } = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
        // queryClient.removeQueries()
        setIsLoggedIn(false)
      },
    },
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-400 bg-white shadow-2xs">
      <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
        <Link
          aria-label="Home"
          className="flex items-center gap-3"
          title="Home"
          to="/"
        >
          <img alt="" className="h-9 w-9 shrink-0" src="/logo.png" />
          <span className="sr-only text-xl md:not-sr-only">PokeTeam</span>
        </Link>
        <Navigation className="justify-self-center" />
        <div className="flex items-center gap-2">
          <Profile className="sr-only md:not-sr-only" />
          <Button disabled={isPending} onClick={() => logout({})}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
