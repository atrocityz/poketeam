import type {
  NamedApiResource,
  NamedApiResourceList,
} from "@/../@types/Utility/NamedApiResourceList"

import { api } from "../../instance"

export interface GetPokemonsParams {
  limit: number
  offset: number
}

export type GetPokemonsRequestConfig = AxiosRequestConfig<GetPokemonsParams>

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  api.get<NamedApiResourceList<NamedApiResource>>(`pokemon`, {
    ...config,
    params: {
      ...params,
      ...config?.params,
    },
  })
