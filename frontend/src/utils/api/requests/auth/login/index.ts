import type { AxiosRequestConfig } from "axios"

import type { AuthResponse } from "@/../@types/auth"

import { api } from "../../../instance"

export interface PostLoginUserParams {
  email: string
  password: string
}

export interface PostLoginUserRequestConfig {
  config?: AxiosRequestConfig
  params: PostLoginUserParams
}

export const postLoginUser = ({ config, params }: PostLoginUserRequestConfig) =>
  api.post<AuthResponse>("auth/login", params, config)
