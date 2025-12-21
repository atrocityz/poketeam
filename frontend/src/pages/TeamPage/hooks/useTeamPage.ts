import type { PokemonEntity } from "@/../@types/myApi"

import {
  useGetUserTeamQuery,
  usePutUserTeamUpdateMutation,
} from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"
import { queryClient } from "@/utils/lib"

export const useTeamPage = () => {
  const getTeamQuery = useGetUserTeamQuery()
  const putTeamMutation = usePutUserTeamUpdateMutation({
    options: {
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: ["getUserTeam"] })

        const previousTeam = queryClient.getQueryData(["getUserTeam"])

        queryClient.setQueryData(["getUserTeam"], (old: any) => ({
          ...old,
          data: {
            ...old.data,
            pokemons: variables.params.pokemons,
          },
        }))

        return { previousTeam }
      },
      onError: (_err, _variables, context) => {
        if (context?.previousTeam) {
          queryClient.setQueryData(["getUserTeam"], context.previousTeam)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["getUserTeam"] })
      },
    },
  })

  const pokemons = getTeamQuery.data?.data.pokemons ?? []
  const remainingPokemonSpots = Array.from({
    length: POKEMONS.TEAM_COUNT_LIMIT - pokemons.length,
  })

  const removePokemonFromTeam = (id: PokemonEntity["id"]) => {
    const filteredPokemons = pokemons.filter((pokemon) => id !== pokemon.id)

    putTeamMutation.mutate({
      params: {
        pokemons: filteredPokemons,
      },
    })
  }

  return {
    state: {
      pokemons,
      remainingPokemonSpots,
      isGetTeamQueryLoading: getTeamQuery.isLoading,
    },
    functions: {
      removePokemonFromTeam,
    },
  }
}
