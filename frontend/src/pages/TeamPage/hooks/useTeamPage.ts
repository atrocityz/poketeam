import type { PokemonEntity } from "@/../@types/myApi"

import { useGetTeamQuery, usePutTeamUpdateMutation } from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"
import { QUERY_KEYS } from "@/utils/constants/queries"
import { queryClient } from "@/utils/lib"

export const useTeamPage = () => {
  const getTeamQuery = useGetTeamQuery()
  const putTeamMutation = usePutTeamUpdateMutation({
    options: {
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.TEAM.GET_TEAM],
        })

        const previousTeam = queryClient.getQueryData([
          QUERY_KEYS.TEAM.GET_TEAM,
        ])

        queryClient.setQueryData([QUERY_KEYS.TEAM.GET_TEAM], (old: any) => ({
          ...old,
          data: {
            ...old.data,
            pokemons: variables.params.pokemons,
          },
        }))

        return { previousTeam }
      },
      onError: (_err, _variables, context) => {
        if (context && context.previousTeam) {
          queryClient.setQueryData(
            [QUERY_KEYS.TEAM.GET_TEAM],
            context.previousTeam,
          )
        }
      },
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.TEAM.GET_TEAM], data)
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
