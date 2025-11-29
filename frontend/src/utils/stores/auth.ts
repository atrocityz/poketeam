import { create } from "zustand"

import type { User } from "@/../@types/auth"

interface AuthStoreState {
  isLoggedIn: boolean
  user: User
  setIsLoggedIn: (value: boolean) => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
  user: {} as User,
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUser: (user) => set({ user }),
}))
