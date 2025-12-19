import { toast } from "sonner"

import type { PokemonEntity } from "@/../@types/myApi"

import {
  useGetUserTeamQuery,
  usePutUserTeamUpdateMutation,
} from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"

export const useTeamPage = () => {
  const getTeamQuery = useGetUserTeamQuery()
  const putTeamMutation = usePutUserTeamUpdateMutation()

  const pokemons = getTeamQuery.data?.data.pokemons ?? []
  const remainingPokemonSpots = Array.from({
    length: POKEMONS.TEAM_COUNT_LIMIT - pokemons.length,
  })

  const removePokemonFromTeam = (id: PokemonEntity["id"]) => {
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.id !== id)

    putTeamMutation.mutate(
      {
        params: {
          pokemons: filteredPokemons,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Pokemon successful deleted from team`)
        },
      },
    )
  }

  return {
    state: {
      pokemons,
      isPutTeamQuery: putTeamMutation.isPending,
      remainingPokemonSpots,
    },
    functions: {
      removePokemonFromTeam,
    },
  }
}
