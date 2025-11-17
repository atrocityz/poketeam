import type {
  NamedApiResource,
  NamedApiResourceList,
} from "@/../@types/Utility/NamedApiResourceList"

import { api } from "../../instance"

export interface GetPokemonsRequestConfig {
  limit: number
  offset: number
}

export type GetPokemonsConfig = AxiosRequestConfig<GetPokemonsRequestConfig>

export const getPokemons = async ({ config, params }: GetPokemonsConfig) => {
  const response = await api.get<NamedApiResourceList<NamedApiResource>>(
    `pokemon?offset=${params.offset}&limit=${params.limit}`,
    config,
  )

  return response.data
}
