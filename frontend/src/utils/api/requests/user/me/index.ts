import type { AxiosRequestConfig } from "axios"

import type { User } from "@/../@types/auth"

import { apiWithAuth } from "@/utils/api/instance"

export const getUser = (config?: AxiosRequestConfig) =>
  apiWithAuth.get<User>("user/me", config)
