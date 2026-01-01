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
      <ul className="flex items-center gap-2">
        <li>
          <Link
            className={cn(
              "hover:bg-muted rounded-lg border px-2.5 py-2 text-lg font-medium transition-colors hover:cursor-pointer",
              {
                "bg-muted pointer-events-none":
                  location.pathname === routes.pokemons.path,
              },
            )}
            to={routes.pokemons.path}
          >
            Pokemons
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "hover:bg-muted rounded-lg border px-2.5 py-2 text-lg font-medium transition-colors hover:cursor-pointer",
              {
                "bg-muted pointer-events-none":
                  location.pathname === routes.team.path,
              },
            )}
            to={routes.team.path}
          >
            Team
          </Link>
        </li>
      </ul>
    </nav>
  )
}
