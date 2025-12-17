import type { AxiosRequestConfig } from "axios"

import { apiWithAuth } from "@/utils/api/instance"

import type { User } from "../../../../../../@types/myApi"

export const getUser = (config?: AxiosRequestConfig) =>
  apiWithAuth.get<User>("user/me", config)
