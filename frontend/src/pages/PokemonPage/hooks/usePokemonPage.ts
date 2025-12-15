import { useParams } from "react-router"

import {
  useGetLastPokemonIdUrlQuery,
  useGetPokemonQuery,
} from "@/utils/api/hooks"
import { POKEMONS_QUERY } from "@/utils/constants"
import { dbPokemonToPokemonEntity, getPokemonIdFromUrl } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const pokemonQuery = useGetPokemonQuery({
    id: +(params.pokemonId as string),
  })

  const lastPokemonIdUrlQuery = useGetLastPokemonIdUrlQuery()
  const lastPokemonId = lastPokemonIdUrlQuery.data
    ? getPokemonIdFromUrl(lastPokemonIdUrlQuery.data)
    : undefined

  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)

  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  const nextPokemonId =
    pokemon &&
    Math.min(pokemon.id + 1, lastPokemonId || POKEMONS_QUERY.SAFE_POKEMON_COUNT)

  const hasPrevPokemon = prevPokemonId !== pokemon?.id
  const hasNextPokemon = nextPokemonId !== pokemon?.id

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
      isLastPokemonIdLoading: lastPokemonIdUrlQuery.isLoading,
      prevPokemonId,
      nextPokemonId,
      hasPrevPokemon,
      hasNextPokemon,
    },
  }
}
