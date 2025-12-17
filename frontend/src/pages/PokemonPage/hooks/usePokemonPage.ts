import { useParams } from "react-router"

import type { PokemonEntity } from "@/../@types/myApi"

import {
  useGetLastPokemonIdUrlQuery,
  useGetPokemonQuery,
  useGetUserTeamQuery,
  usePutUserTeamUpdateMutation,
} from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"
import { dbPokemonToPokemonEntity, getPokemonIdFromUrl } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const pokemonQuery = useGetPokemonQuery({
    id: +(params.pokemonId as string),
  })
  const lastPokemonIdUrlQuery = useGetLastPokemonIdUrlQuery()
  const getTeamQuery = useGetUserTeamQuery()
  const putTeamMutation = usePutUserTeamUpdateMutation()

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

  // TODO: Probably i dont need add or remove pokemon from team when i didnt get it
  const pokemonsInTeam = getTeamQuery.data?.data.pokemons ?? []
  const addPokemonToTeam = (pokemon: PokemonEntity) => {
    putTeamMutation.mutate({
      params: {
        pokemons: [...pokemonsInTeam, pokemon],
      },
    })
  }

  const removePokemonFromTeam = (id: PokemonEntity["id"]) => {
    if (!getTeamQuery.data?.data) return

    const filteredPokemons = pokemonsInTeam.filter(
      (pokemon) => pokemon.id !== id,
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
    },
    functions: {
      removePokemonFromTeam,
      addPokemonToTeam,
    },
  }
}
