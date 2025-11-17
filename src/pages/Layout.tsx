import type { ReactNode } from "react"

import { Link } from "react-router"

import { ROUTES } from "@/utils/constants"

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="fixed top-0 flex w-full items-center justify-between gap-4 border-b border-gray-400 bg-white px-8 py-4 shadow-2xs">
        <Link className="flex items-center gap-3" to={ROUTES.POKEMONS}>
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
              <Link className="text-xl hover:underline" to={ROUTES.POKEMONS}>
                Pokemons
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
