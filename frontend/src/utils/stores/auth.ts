import { create } from "zustand"

import type { User } from "@/../@types/myApi"

interface AuthStoreState {
  isLoading: boolean
  isLoggedIn: boolean
  user: User
  setIsLoggedIn: (value: boolean) => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
  user: {} as User,
  isLoggedIn: false,
  isLoading: true,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUser: (user) => set({ user }),
}))
