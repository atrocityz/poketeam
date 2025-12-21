import { useParams } from "react-router"
import { toast } from "sonner"

import type { PokemonEntity } from "@/../@types/myApi"

import {
  useGetLastPokemonIdUrlQuery,
  useGetPokemonQuery,
  useGetUserTeamQuery,
  usePutUserTeamUpdateMutation,
} from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"
import { dbPokemonToPokemonEntity, getPokemonIdFromUrl } from "@/utils/helpers"
import { queryClient } from "@/utils/lib"

export const usePokemonPage = () => {
  const params = useParams()
  const pokemonQuery = useGetPokemonQuery({
    id: +(params.pokemonId as string),
  })
  const lastPokemonIdUrlQuery = useGetLastPokemonIdUrlQuery()
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

  const lastPokemonId = lastPokemonIdUrlQuery.data
    ? getPokemonIdFromUrl(lastPokemonIdUrlQuery.data)
    : undefined
  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)
  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  const nextPokemonId =
    pokemon &&
    Math.min(pokemon.id + 1, lastPokemonId || POKEMONS.SAFE_POKEMON_COUNT)
  const hasPrevPokemon = prevPokemonId !== pokemon?.id
  const hasNextPokemon = nextPokemonId !== pokemon?.id

  const pokemonsInTeam = getTeamQuery.data?.data.pokemons ?? []
  const addPokemonToTeam = (pokemon: PokemonEntity) => {
    if (!getTeamQuery.data?.data) return

    const pokemonsWithNew = [...pokemonsInTeam, pokemon]

    if (pokemonsWithNew.length === POKEMONS.TEAM_COUNT_LIMIT) {
      toast.info("Your pokemon team is full")
    }

    putTeamMutation.mutate({
      params: {
        pokemons: pokemonsWithNew,
      },
    })
  }

  const removePokemonFromTeam = (id: PokemonEntity["id"]) => {
    const filteredPokemons = pokemonsInTeam.filter(
      (pokemon) => id !== pokemon.id,
    )

    putTeamMutation.mutate({
      params: {
        pokemons: filteredPokemons,
      },
    })
  }

  const isPokemonInTeam = !!pokemonsInTeam.find(
    (pokemonInTeam) => pokemonInTeam.id === pokemon?.id,
  )
  const isTeamFull = pokemonsInTeam.length === POKEMONS.TEAM_COUNT_LIMIT

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
      isLastPokemonIdLoading: lastPokemonIdUrlQuery.isLoading,
      prevPokemonId,
      nextPokemonId,
      hasPrevPokemon,
      hasNextPokemon,
      isPokemonInTeam,
      isTeamFull,
      isPutTeamQueryLoading: putTeamMutation.isPending,
      isGetTeamQueryLoading: getTeamQuery.isLoading,
    },
    functions: {
      removePokemonFromTeam,
      addPokemonToTeam,
    },
  }
}
