import { Link } from "react-router"

import { Navigation } from "./components/Navigation"
import { ProfileMenu } from "./components/ProfileMenu"

export const Header = () => (
  <header className="border-muted-foreground/30 bg-background sticky top-0 z-50 w-full border-b shadow-2xs">
    <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2">
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
      <ProfileMenu />
    </div>
  </header>
)
