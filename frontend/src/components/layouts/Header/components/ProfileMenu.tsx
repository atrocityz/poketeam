import Cookies from "js-cookie"
import { LogOut, UserRound } from "lucide-react"
import { Link } from "react-router"

import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import { usePostLogoutMutation } from "@/utils/api/hooks"
import { routes } from "@/utils/config"
import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores"

export const ProfileMenu = () => {
  const { setIsLoggedIn, user } = useAuthStore()
  const { mutateAsync, isPending } = usePostLogoutMutation()

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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="focus:bg-destructive/35 hover:cursor-pointer"
        >
          <button
            className="flex w-full items-center gap-1 hover:cursor-pointer"
            disabled={isPending}
            type="button"
            onClick={() => logout()}
          >
            <LogOut className="text-foreground" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
