import { Link, useLocation } from "react-router"

import { Profile } from "@/components/Profile"
import { routes } from "@/utils/config"
import { cn } from "@/utils/lib"

// TODO: Логику получения данных о пользователе и logout можно куда-нибудь вынести
export const Header = () => {
  const location = useLocation()

  const isActiveLink = (pathname: string) => {
    return location.pathname === pathname
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-gray-400 bg-white px-8 py-4 shadow-2xs">
      <Link
        aria-label="Home"
        className="flex items-center gap-3"
        title="Home"
        to="/"
      >
        <img alt="" className="h-9 w-9" src="/logo.png" />
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
          </li>
        </ul>
      </nav>
      <Profile />
    </header>
  )
}
