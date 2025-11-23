import type { AxiosRequestConfig } from "axios"

import type {
  NamedApiResource,
  NamedApiResourceList,
} from "@/../@types/pokeapi"

import { pokeApi } from "../../instance"

export interface GetPokemonsParams {
  limit: number
  offset: number
}

interface GetPokemonsRequestConfig {
  config?: AxiosRequestConfig
  params: GetPokemonsParams
}

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  pokeApi.get<NamedApiResourceList<NamedApiResource>>(`pokemon`, {
    ...config,
    params: {
      ...params,
      ...config?.params,
    },
  })
