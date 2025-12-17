import type { AxiosRequestConfig } from "axios"

import type { AuthResponse } from "../../../../../../@types/myApi"

import { api } from "../../../instance"

export interface PostRegisterUserParams {
  avatarUrl: string
  email: string
  login?: string
  password: string
}

export interface PostRegisterUserRequestConfig {
  config?: AxiosRequestConfig
  params: PostRegisterUserParams
}

export const postRegisterUser = ({
  config,
  params,
}: PostRegisterUserRequestConfig) =>
  api.post<AuthResponse>("auth/register", params, config)
