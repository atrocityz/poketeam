import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui"
import { useThemeStore } from "@/utils/stores"

export const ThemeToggler = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <Button size="icon" variant="outline" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
