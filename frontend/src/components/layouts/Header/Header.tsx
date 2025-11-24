import { Activity } from "react"
import { Link, useLocation, useNavigate } from "react-router"

import { Profile } from "@/components/Profile"
import { useProfile } from "@/components/Profile/useProfile"
import { Button, Skeleton } from "@/components/ui"
import { routes } from "@/utils/config"
import { cn } from "@/utils/lib"

export const Header = () => {
  const { isLoading, profile, onLogout } = useProfile()
  const navigate = useNavigate()
  const location = useLocation()

  const isActiveLink = (pathname: string) => {
    return location.pathname === pathname
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-gray-400 bg-white px-8 py-4 shadow-2xs">
      <Link className="flex items-center gap-3" to="/">
        <img
          alt=""
          aria-label="Home"
          className="h-9 w-9"
          src="/logo.png"
          title="Home"
        />
        <span className="text-xl">PokeTeam</span>
      </Link>
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link
              className={cn("text-xl hover:underline", {
                "pointer-events-none underline": isActiveLink(
                  routes.pokemons.getHref(),
                ),
              })}
              to={routes.pokemons.path}
            >
              Pokemons
            </Link>
          </li>
          <li>
            <Activity mode={profile ? "hidden" : "visible"}>
              <Link
                className={cn("text-xl hover:underline", {
                  "pointer-events-none underline": isActiveLink(
                    routes.auth.getHref(),
                  ),
                })}
                to={routes.auth.path}
              >
                Auth
              </Link>
            </Activity>
            <Activity mode={profile ? "visible" : "hidden"}>
              <Link
                className={cn("text-xl hover:underline", {
                  "pointer-events-none underline": isActiveLink(
                    routes.profile.getHref(),
                  ),
                })}
                to={routes.profile.path}
              >
                Profile
              </Link>
            </Activity>
          </li>
        </ul>
      </nav>
      {isLoading && <Skeleton className="h-12 w-[200px]" />}
      {profile && (
        <div className="flex items-center gap-2">
          <Profile profile={profile} />
          <Button
            onClick={() => {
              onLogout()
              navigate(routes.auth.getHref(), {
                replace: true,
              })
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  )
}
