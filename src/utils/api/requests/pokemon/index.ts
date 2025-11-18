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

export const getPokemons = ({ config, params }: GetPokemonsConfig) =>
  api.get<NamedApiResourceList<NamedApiResource>>(
    `pokemon?offset=${params.offset}&limit=${params.limit}`,
    config,
  )
