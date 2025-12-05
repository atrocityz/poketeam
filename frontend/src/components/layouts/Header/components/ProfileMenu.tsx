import Cookies from "js-cookie"
import { LogOut, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router"

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
  const navigate = useNavigate()
  const { mutate: logout, isPending } = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
        setIsLoggedIn(false)
        navigate(routes.auth.getHref(), {
          replace: true,
        })
      },
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent rounded-lg p-1 transition-colors hover:cursor-pointer">
        <Avatar className="size-10">
          <AvatarImage src={user.avatarUrl} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background">
        <DropdownMenuItem className="hover:bg-accent">
          <Link
            className="flex w-full items-center gap-1"
            to={routes.profile.getHref()}
          >
            <UserRound className="text-foreground" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-destructive/35">
          <button
            className="flex w-full items-center gap-1 hover:cursor-pointer"
            disabled={isPending}
            type="button"
            onClick={() => logout({})}
          >
            <LogOut className="text-foreground" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
