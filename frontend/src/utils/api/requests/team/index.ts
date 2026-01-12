import type { AxiosRequestConfig } from "axios"

import type { Team } from "@/../@types/myApi"

import { apiWithAuth } from "../../instance"

export const getTeam = (config?: AxiosRequestConfig) =>
  apiWithAuth.get<Team>("team", config)
