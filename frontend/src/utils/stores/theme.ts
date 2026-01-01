import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "dark" | "light"

interface ThemeStoreState {
  theme: Theme
  toggleTheme: (event: React.MouseEvent) => void
}

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: async (event: React.MouseEvent) => {
        const x = event.clientX
        const y = event.clientY

        const radius = Math.hypot(window.innerWidth, window.innerHeight)

        await document.startViewTransition(() => {
          set((state) =>
            state.theme === "dark" ? { theme: "light" } : { theme: "dark" },
          )
        }).ready

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        )
      },
    }),
    {
      name: "theme",
    },
  ),
)
