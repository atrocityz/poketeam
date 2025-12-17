import type { AxiosRequestConfig } from "axios"

import { api } from "@/utils/api/instance"

import type { AuthResponse } from "../../../../../../@types/myApi"

export const postRefreshTokens = (config?: AxiosRequestConfig) =>
  api.post<AuthResponse>("auth/refresh", {}, config)
