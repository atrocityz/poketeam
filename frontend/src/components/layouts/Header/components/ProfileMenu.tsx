import Cookies from "js-cookie"
import { ChevronsUpDown, Lamp, LogOut } from "lucide-react"
import { toast } from "sonner"

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
import { COOKIE } from "@/utils/constants"
import { useAuthStore, useThemeStore } from "@/utils/stores"

export const ProfileMenu = () => {
  const { setIsLoggedIn, user } = useAuthStore()
  const { mutateAsync, isPending } = usePostLogoutMutation()
  const { toggleTheme, theme } = useThemeStore()

  const logout = () => {
    mutateAsync({})
    Cookies.remove(COOKIE.ACCESS_TOKEN)
    setIsLoggedIn(false)
    toast.success("Logout successful")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 hover:cursor-pointer">
        <div className="flex items-center gap-1.5">
          <Avatar className="size-6 select-none">
            <AvatarImage src={user.avatarUrl} />
          </Avatar>
          <p className="hidden max-w-24 truncate sm:block">{user.login}</p>
        </div>
        <ChevronsUpDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        <DropdownMenuItem
          className="hover:bg-accent relative after:absolute after:inset-0 hover:cursor-pointer"
          onClick={toggleTheme}
          onSelect={(event) => event.preventDefault()}
        >
          <Lamp className="text-foreground" />
          <label htmlFor="theme-mode">Dark Mode</label>
          <Switch checked={theme === "dark"} id="theme-mode" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <button
            className="text-destructive focus:text-destructive focus:bg-destructive/15 flex w-full items-center gap-1 hover:cursor-pointer"
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
