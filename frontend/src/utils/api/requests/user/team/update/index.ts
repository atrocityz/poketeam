import type { AxiosRequestConfig } from "axios"

import type { PokemonEntity, Team } from "@/../@types/myApi"

import { apiWithAuth } from "../../../../instance"

export interface PutUpdateTeamParams {
  pokemons: PokemonEntity[]
}

export interface PutUpdateTeamRequestConfig {
  config?: AxiosRequestConfig
  params: PutUpdateTeamParams
}

export const putUpdateTeam = ({ config, params }: PutUpdateTeamRequestConfig) =>
  apiWithAuth.put<Team>(`user/team/update`, params, config)
