import type { AxiosRequestConfig } from "axios"

import { api } from "@/utils/api/instance"

export interface GetLogoutRequestConfig {
  config?: AxiosRequestConfig
}

export const logout = ({ config }: GetLogoutRequestConfig) =>
  api.post<boolean>("auth/logout", config)
