import type { AxiosRequestConfig } from "axios"

import type { AuthResponse } from "@/../@types/auth"

import { api } from "@/utils/api/instance"

export const postRefreshTokens = (config?: AxiosRequestConfig) =>
  api.post<AuthResponse>("auth/refresh", {}, config)
