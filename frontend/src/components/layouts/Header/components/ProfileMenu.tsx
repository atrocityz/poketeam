import Cookies from "js-cookie"
import { Lamp, LogOut, UserRound } from "lucide-react"
import { Link } from "react-router"

import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Switch,
} from "@/components/ui"
import { usePostLogoutMutation } from "@/utils/api/hooks"
import { routes } from "@/utils/config"
import { COOKIE } from "@/utils/constants"
import { useAuthStore, useThemeStore } from "@/utils/stores"

export const ProfileMenu = () => {
  const { setIsLoggedIn, user } = useAuthStore()
  const { mutateAsync, isPending } = usePostLogoutMutation()
  const { setTheme, theme } = useThemeStore()

  const logout = () => {
    mutateAsync({})
    Cookies.remove(COOKIE.ACCESS_TOKEN)
    setIsLoggedIn(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent rounded-full p-2 transition-colors duration-300 hover:cursor-pointer">
        <Avatar className="size-10">
          <AvatarImage src={user.avatarUrl} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        <DropdownMenuItem
          asChild
          className="hover:bg-accent hover:cursor-pointer"
        >
          <Link
            className="flex w-full items-center gap-1"
            to={routes.profile.getHref()}
          >
            <UserRound className="text-foreground" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-accent relative after:absolute after:inset-0 hover:cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          onSelect={(event) => event.preventDefault()}
        >
          <Lamp className="text-foreground" />
          <label htmlFor="theme-mode">Dark Mode</label>
          <Switch checked={theme === "dark"} id="theme-mode" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <button
            className="text-destructive flex w-full items-center gap-1 hover:cursor-pointer"
            disabled={isPending}
            type="button"
            onClick={() => logout()}
          >
            <LogOut className="text-inherit" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
