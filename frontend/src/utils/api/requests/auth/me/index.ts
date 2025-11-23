import type { AxiosRequestConfig } from "axios"

import type { User } from "@/../@types/auth"

import { apiWithAuth } from "@/utils/api/instance"

interface GetUserRequestConfig {
  config?: AxiosRequestConfig
}

export const getUser = ({ config }: GetUserRequestConfig) =>
  apiWithAuth.get<Omit<User, "password">>("auth/me", config)
