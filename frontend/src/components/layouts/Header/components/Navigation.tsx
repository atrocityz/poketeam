import { Link, useLocation } from "react-router"

import { routes } from "@/utils/config"
import { cn } from "@/utils/lib"

interface NavigationProps {
  className?: string
}

export const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation()

  return (
    <nav className={className}>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            className={cn("text-lg hover:underline md:text-xl", {
              "pointer-events-none underline":
                location.pathname === routes.pokemons.getHref(),
            })}
            to={routes.pokemons.path}
          >
            Pokemons
          </Link>
        </li>
        <li>
          <Link
            className={cn("text-lg hover:underline md:text-xl", {
              "pointer-events-none underline":
                location.pathname === routes.profile.getHref(),
            })}
            to={routes.profile.path}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}
